import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Results, NormalizedLandmarkList } from "@mediapipe/hands";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useMagneticSnap } from "@/hooks/useMagneticSnap";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type MediaPipeHandsInstance = {
  setOptions(options: Record<string, unknown>): void;
  onResults(cb: (results: Results) => void): void;
  send(input: { image: HTMLCanvasElement | HTMLVideoElement }): Promise<void>;
  close(): void;
};

type MediaPipeHandsCtor = new (config: {
  locateFile: (file: string) => string;
}) => MediaPipeHandsInstance;

interface HandState {
  cursorX: number;
  cursorY: number;
  isPinching: boolean;
  landmarks: NormalizedLandmarkList | null;
  inTopZone: boolean;
  isTwoFinger: boolean;
}

const PINCH_START_THRESHOLD = 0.05;
const PINCH_END_THRESHOLD = 0.08;
const CURSOR_SIZE = 24;
const PINCH_CLICK_HOLD_MS = 400;
const VELOCITY_THRESHOLD = 200;
const MIN_LERP = 0.15;
const MAX_LERP = 0.45;
const MIN_HAND_CONFIDENCE = 0.7;
const MAX_HAND_Z_DEPTH = 0.1;
const ACTIVE_ZONE_MIN = 0.2;
const ACTIVE_ZONE_MAX = 0.8;
const CURSOR_EMA_ALPHA = 0.25;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const euclideanDist = (
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);

/** Returns true if only the index finger is extended (pointing pose). */
const isPointingPose = (landmarks: NormalizedLandmarkList): boolean => {
  const isExtended = (tipIdx: number, pipIdx: number) =>
    landmarks[tipIdx].y < landmarks[pipIdx].y;

  const indexOut = isExtended(8, 6);
  const middleCurled = !isExtended(12, 10);
  const ringCurled = !isExtended(16, 14);
  const pinkyCurled = !isExtended(20, 18);

  const curledCount = [middleCurled, ringCurled, pinkyCurled].filter(Boolean).length;
  return indexOut && curledCount >= 2;
};

/** Returns true if index AND middle fingers are extended, others curled (two-finger scroll pose). */
const isTwoFingerPose = (landmarks: NormalizedLandmarkList): boolean => {
  const isExtended = (tipIdx: number, pipIdx: number) =>
    landmarks[tipIdx].y < landmarks[pipIdx].y;

  const indexOut = isExtended(8, 6);
  const middleOut = isExtended(12, 10);
  const ringCurled = !isExtended(16, 14);
  const pinkyCurled = !isExtended(20, 18);

  return indexOut && middleOut && ringCurled && pinkyCurled;
};

/** Returns true if all 5 fingers are extended (open palm). */
const isOpenPalm = (landmarks: NormalizedLandmarkList): boolean => {
  const isExtended = (tipIdx: number, pipIdx: number) =>
    landmarks[tipIdx].y < landmarks[pipIdx].y;

  // Thumb uses x-axis (tip further from palm center = extended)
  const thumbOut = landmarks[4].x < landmarks[3].x; // for right hand (mirrored)
  const indexOut = isExtended(8, 6);
  const middleOut = isExtended(12, 10);
  const ringOut = isExtended(16, 14);
  const pinkyOut = isExtended(20, 18);

  return indexOut && middleOut && ringOut && pinkyOut;
};

/** Returns true if only the pinky finger is extended (back gesture). */
const isPinkyBackPose = (landmarks: NormalizedLandmarkList): boolean => {
  const isExtended = (tipIdx: number, pipIdx: number) => landmarks[tipIdx].y < landmarks[pipIdx].y;

  const indexCurled = !isExtended(8, 6);
  const middleCurled = !isExtended(12, 10);
  const ringCurled = !isExtended(16, 14);
  const pinkyOut = isExtended(20, 18);

  // Require at least 3 curled + pinky out to avoid accidental triggers.
  const curledCount = [indexCurled, middleCurled, ringCurled].filter(Boolean).length;
  return pinkyOut && curledCount >= 3;
};

const OPEN_PALM_HOLD_MS = 1000;
const PINKY_BACK_COOLDOWN_MS = 1500;

const getGestureInitMessage = (error: unknown) => {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") return "Camera blocked";
    if (error.name === "NotFoundError") return "No camera found";
    if (error.name === "NotReadableError") return "Camera busy";
    if (error.name === "OverconstrainedError") return "Camera unavailable";
  }

  if (error instanceof Error) {
    if (error.message.includes("MediaPipe Hands script not loaded")) {
      return "Model script blocked";
    }
  }

  return "Failed to initialize";
};

const MEDIAPIPE_HANDS_VERSION = "0.4.1675469240";

const getHandsCtor = (): MediaPipeHandsCtor | null => {
  const g = globalThis as unknown as {
    Hands?: unknown;
  };

  const maybe = g.Hands;
  if (typeof maybe === "function") return maybe as MediaPipeHandsCtor;

  if (maybe && typeof (maybe as { Hands?: unknown }).Hands === "function") {
    return (maybe as { Hands: MediaPipeHandsCtor }).Hands;
  }

  if (maybe && typeof (maybe as { default?: unknown }).default === "function") {
    return (maybe as { default: MediaPipeHandsCtor }).default;
  }

  if (
    maybe &&
    typeof (maybe as { default?: { Hands?: unknown } }).default?.Hands === "function"
  ) {
    return (maybe as { default: { Hands: MediaPipeHandsCtor } }).default.Hands;
  }

  return null;
};

const ensureHandsScriptLoaded = async (): Promise<void> => {
  if (getHandsCtor()) return;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="@mediapipe/hands"][src$="hands.js"]'
    );
    if (existing) {
      // If the script already ran but Hands isn't available, don't hang waiting for `load`.
      if (getHandsCtor()) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("MediaPipe Hands script failed to load")), {
        once: true,
      });
      return;
    }

    const s = document.createElement("script");
    s.src = `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${MEDIAPIPE_HANDS_VERSION}/hands.js`;
    s.crossOrigin = "anonymous";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("MediaPipe Hands script failed to load"));
    document.head.appendChild(s);
  });

  if (!getHandsCtor()) {
    throw new Error("MediaPipe Hands script not loaded");
  }
};

const getCameraStream = async (): Promise<MediaStream> => {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera API unavailable");
  }

  const cameraAttempts: MediaStreamConstraints[] = [
    {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: { ideal: "user" },
      },
      audio: false,
    },
    {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    },
    {
      video: true,
      audio: false,
    },
  ];

  let lastError: unknown = null;

  for (const constraints of cameraAttempts) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      lastError = error;
      if (
        !(error instanceof DOMException) ||
        !["NotFoundError", "OverconstrainedError"].includes(error.name)
      ) {
        throw error;
      }
    }
  }

  throw lastError ?? new Error("Unable to access camera");
};


const HandGestureManager: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handsRef = useRef<MediaPipeHandsInstance | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [showTopZone, setShowTopZone] = useState(false);
  const [showBottomZone, setShowBottomZone] = useState(false);
  const [showScrollZones, setShowScrollZones] = useState(false);
  const [cursorMode, setCursorMode] = useState<"point" | "pinch">("point");
  const [isPulsing, setIsPulsing] = useState(false);
  const [gestureToast, setGestureToast] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(() => sessionStorage.getItem("gestureHelpOpen") === "true");
  const helpAutoShownRef = useRef(false);

  const { findSnapTarget, snapTargetRef, isSnappingRef, clearHover } = useMagneticSnap();

  // Framer Motion values for GPU-accelerated cursor
  const cursorX = useMotionValue(window.innerWidth / 2);
  const cursorY = useMotionValue(window.innerHeight / 2);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const stateRef = useRef<HandState>({
    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2,
    isPinching: false,
    landmarks: null,
    inTopZone: false,
    isTwoFinger: false,
  });

  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const prevTargetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pinchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinchClickFiredRef = useRef(false);
  const pinchLockRef = useRef<{ x: number; y: number; el: Element | null } | null>(null);
  const emaRef = useRef<{ x: number; y: number } | null>(null);
  const prevScreenYRef = useRef<number | null>(null);
  const lastDetectionTimeRef = useRef<number>(0);
  const openPalmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastBackTimeRef = useRef<number>(0);
  const SCROLL_SPEED_MIN = 4;
  const SCROLL_SPEED_MAX = 28;
  const SCROLL_ZONE_THRESHOLD = 0.50;

  const mapHandToScreen = useCallback((rawX: number, rawY: number) => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Active Zone (center 60%): clamp to [0.2..0.8]
    const xIn = clamp(rawX, ACTIVE_ZONE_MIN, ACTIVE_ZONE_MAX);
    const yIn = clamp(rawY, ACTIVE_ZONE_MIN, ACTIVE_ZONE_MAX);

    // Map [0.2..0.8] -> [0..1] with linear interpolation math
    const nx = (xIn - ACTIVE_ZONE_MIN) / (ACTIVE_ZONE_MAX - ACTIVE_ZONE_MIN);
    const ny = (yIn - ACTIVE_ZONE_MIN) / (ACTIVE_ZONE_MAX - ACTIVE_ZONE_MIN);

    // Map [0..1] -> pixels
    const targetX = clamp(lerp(0, w, nx), 0, w);
    const targetY = clamp(lerp(0, h, ny), 0, h);

    // EMA smoothing
    const a = clamp(CURSOR_EMA_ALPHA, 0, 1);
    const prev = emaRef.current ?? { x: targetX, y: targetY };
    const smoothed = {
      x: prev.x + a * (targetX - prev.x),
      y: prev.y + a * (targetY - prev.y),
    };

    emaRef.current = smoothed;
    return smoothed;
  }, []);

  useEffect(() => {
    sessionStorage.setItem("gestureHelpOpen", helpOpen ? "true" : "false");
  }, [helpOpen]);

  useEffect(() => {
    if (!enabled) {
      helpAutoShownRef.current = false;
      return;
    }

    if (helpAutoShownRef.current) return;
    helpAutoShownRef.current = true;

    const hasSeen = sessionStorage.getItem("gestureHelpSeen") === "true";
    if (!hasSeen) {
      setHelpOpen(true);
      sessionStorage.setItem("gestureHelpSeen", "true");
      sessionStorage.setItem("gestureHelpOpen", "true");
    }
  }, [enabled]);

  const onResults = useCallback((results: Results) => {
    const state = stateRef.current;

    const cancelPinch = () => {
      if (state.isPinching) {
        state.isPinching = false;
        pinchLockRef.current = null;
        setCursorMode("point");
      }
      if (pinchTimerRef.current) {
        clearTimeout(pinchTimerRef.current);
        pinchTimerRef.current = null;
      }
      pinchClickFiredRef.current = false;
    };

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // === Hand Filtering ===
      const avgZ = (lm: NormalizedLandmarkList) =>
        lm.reduce((sum, p) => sum + p.z, 0) / lm.length;

      // Filter by confidence and z-depth
      const validHands: NormalizedLandmarkList[] = [];
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        const lm = results.multiHandLandmarks[i];
        const handedness = results.multiHandedness?.[i];
        const score = handedness?.score ?? 1;
        const z = avgZ(lm);

        if (score >= MIN_HAND_CONFIDENCE && z <= MAX_HAND_Z_DEPTH) {
          validHands.push(lm);
        }
      }

      if (validHands.length === 0) {
        state.landmarks = null;
        cancelPinch();
        emaRef.current = null;
        return;
      }

      // Pick closest valid hand
      let landmarks = validHands[0];
      if (validHands.length > 1) {
        const z0 = avgZ(validHands[0]);
        const z1 = avgZ(validHands[1]);
        landmarks = z0 <= z1 ? validHands[0] : validHands[1];
      }
      state.landmarks = landmarks;

      // === Pointing Pose Filter ===
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const pinchDist = euclideanDist(thumbTip, indexTip);
      const isPinchGesture = pinchDist < PINCH_END_THRESHOLD;
      const palmOpen = isOpenPalm(landmarks);

      // === Open Palm Hold → Navigate Home ===
      if (palmOpen && !isPinchGesture) {
        cancelPinch();
        emaRef.current = null;
        if (!openPalmTimerRef.current) {
          openPalmTimerRef.current = setTimeout(() => {
            setGestureToast("🏠 Going Home");
            setTimeout(() => setGestureToast(null), 1200);
            navigate("/");
            openPalmTimerRef.current = null;
          }, OPEN_PALM_HOLD_MS);
        }
        prevScreenYRef.current = null;
        clearHover();
        return;
      } else {
        // Palm closed → cancel home timer
        if (openPalmTimerRef.current) {
          clearTimeout(openPalmTimerRef.current);
          openPalmTimerRef.current = null;
        }
      }

      // === Pinky Up → Go Back ===
      if (!isPinchGesture && isPinkyBackPose(landmarks)) {
        const now = Date.now();
        if (now - lastBackTimeRef.current > PINKY_BACK_COOLDOWN_MS) {
          lastBackTimeRef.current = now;
          setGestureToast("👈 Going Back");
          setTimeout(() => setGestureToast(null), 1200);
          clearHover();
          window.history.back();
          return;
        }
      }

      // === Two-Finger Scroll Mode ===
      const twoFinger = isTwoFingerPose(landmarks);
      if (twoFinger !== state.isTwoFinger) {
        state.isTwoFinger = twoFinger;
        setShowScrollZones(twoFinger);
      }

      if (twoFinger && !isPinchGesture) {
        cancelPinch();
        emaRef.current = null;
        // Use average Y of index + middle fingertips to determine scroll direction
        const avgFingerY = (landmarks[8].y + landmarks[12].y) / 2;
        
        if (avgFingerY < SCROLL_ZONE_THRESHOLD) {
          const intensity = 1 - (avgFingerY / SCROLL_ZONE_THRESHOLD);
          const speed = SCROLL_SPEED_MIN + (SCROLL_SPEED_MAX - SCROLL_SPEED_MIN) * intensity;
          window.scrollBy({ top: -speed, behavior: "instant" as ScrollBehavior });
          setShowTopZone(true);
          setShowBottomZone(false);
        } else if (avgFingerY > (1 - SCROLL_ZONE_THRESHOLD)) {
          const intensity = (avgFingerY - (1 - SCROLL_ZONE_THRESHOLD)) / SCROLL_ZONE_THRESHOLD;
          const speed = SCROLL_SPEED_MIN + (SCROLL_SPEED_MAX - SCROLL_SPEED_MIN) * intensity;
          window.scrollBy({ top: speed, behavior: "instant" as ScrollBehavior });
          setShowTopZone(false);
          setShowBottomZone(true);
        } else {
          setShowTopZone(false);
          setShowBottomZone(false);
        }
        
        // Still update cursor position for visual feedback
        const mapped = mapHandToScreen(1 - indexTip.x, indexTip.y);
        const screenX = mapped.x;
        const screenY = mapped.y;
        targetRef.current.x = screenX;
        targetRef.current.y = screenY;
        prevScreenYRef.current = null;
        return;
      }

      // === Single Index Finger: Static cursor for select/click (NO scrolling) ===
      if (!isPointingPose(landmarks) && !isPinchGesture) {
        cancelPinch();
        emaRef.current = null;
        prevScreenYRef.current = null;
        setShowTopZone(false);
        setShowBottomZone(false);
        clearHover();
        return;
      }

      const mapped = mapHandToScreen(1 - indexTip.x, indexTip.y);
      const screenX = mapped.x;
      const screenY = mapped.y;

      // === Active Zone (Top 10%) for pinch-to-top ===
      const inTopZone = indexTip.y < 0.1;
      if (inTopZone !== state.inTopZone) {
        state.inTopZone = inTopZone;
        // Only show this hint when not in two-finger mode
        if (!twoFinger) setShowTopZone(inTopZone);
      }

      // Pinch detection (for click only)
      const wasPinching = state.isPinching;

      if (!wasPinching && pinchDist < PINCH_START_THRESHOLD) {
        state.isPinching = true;
        setCursorMode("pinch");

        // === Active Zone pinch → scroll to top ===
        if (state.inTopZone) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const snap = snapTargetRef.current;
        const lockX = snap?.x ?? state.cursorX;
        const lockY = snap?.y ?? state.cursorY;
        pinchLockRef.current = {
          x: lockX,
          y: lockY,
          el: snap?.element ?? document.elementFromPoint(lockX, lockY),
        };
        targetRef.current.x = lockX;
        targetRef.current.y = lockY;
        prevTargetRef.current.x = lockX;
        prevTargetRef.current.y = lockY;

        pinchClickFiredRef.current = false;

        pinchTimerRef.current = setTimeout(() => {
          if (!pinchClickFiredRef.current) {
            pinchClickFiredRef.current = true;
            const s = stateRef.current;
            const locked = pinchLockRef.current;
            const clickX = locked?.x ?? s.cursorX;
            const clickY = locked?.y ?? s.cursorY;
            const el = locked?.el ?? document.elementFromPoint(clickX, clickY);
            if (el) {
              dispatchGestureClick(el, clickX, clickY);
              setIsPulsing(true);
              setTimeout(() => setIsPulsing(false), 400);
            }
          }
        }, PINCH_CLICK_HOLD_MS);
      } else if (wasPinching && pinchDist > PINCH_END_THRESHOLD) {
        state.isPinching = false;
        setCursorMode("point");
        pinchLockRef.current = null;
        if (pinchTimerRef.current) {
          clearTimeout(pinchTimerRef.current);
          pinchTimerRef.current = null;
        }
      }

      // Update target position (cursor follows finger, no scrolling).
      // When pinching, lock the cursor to prevent "jumping" while selecting.
      if (!state.isPinching) {
        targetRef.current.x = screenX;
        targetRef.current.y = screenY;
        prevScreenYRef.current = screenY;
      }
    } else {
      state.landmarks = null;
      prevScreenYRef.current = null;
      clearHover();
      cancelPinch();
      emaRef.current = null;
    }

    if (showDebug && canvasRef.current && state.landmarks) {
      drawDebugSkeleton(canvasRef.current, state.landmarks);
    }
  }, [showDebug, clearHover, navigate, snapTargetRef, mapHandToScreen]);

  // Animation loop with velocity-adaptive lerp + magnetic snapping
  const animationLoop = useCallback(() => {
    const state = stateRef.current;

    // === Velocity-Adaptive Lerp (One Euro Filter) ===
    const dx = targetRef.current.x - prevTargetRef.current.x;
    const dy = targetRef.current.y - prevTargetRef.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    const adaptiveLerp = velocity > VELOCITY_THRESHOLD ? MAX_LERP : MIN_LERP + (MAX_LERP - MIN_LERP) * (velocity / VELOCITY_THRESHOLD);

    prevTargetRef.current.x = targetRef.current.x;
    prevTargetRef.current.y = targetRef.current.y;

    state.cursorX = lerp(state.cursorX, targetRef.current.x, adaptiveLerp);
    state.cursorY = lerp(state.cursorY, targetRef.current.y, adaptiveLerp);

    // === Magnetic Snapping ===
    const snap = findSnapTarget(state.cursorX, state.cursorY);
    if (snap) {
      // Override with snap target using spring (handled by useSpring)
      cursorX.set(snap.x - CURSOR_SIZE / 2);
      cursorY.set(snap.y - CURSOR_SIZE / 2);
    } else {
      cursorX.set(state.cursorX - CURSOR_SIZE / 2);
      cursorY.set(state.cursorY - CURSOR_SIZE / 2);
    }

    animFrameRef.current = requestAnimationFrame(animationLoop);
  }, [findSnapTarget, cursorX, cursorY]);

  // Detection loop
  const detectLoop = useCallback(async () => {
    if (!videoRef.current || !handsRef.current || !enabled) return;
    if (videoRef.current.readyState >= 2) {
      await handsRef.current.send({ image: videoRef.current });
    }
    setTimeout(() => {
      if (enabled) detectLoop();
    }, 1000 / 30);
  }, [enabled]);

  // === Conditional Camera Activation ===
  useEffect(() => {
    if (!enabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (handsRef.current) {
        handsRef.current.close();
        handsRef.current = null;
      }
      cancelAnimationFrame(animFrameRef.current);
      pinchLockRef.current = null;
      stateRef.current.isPinching = false;
      emaRef.current = null;
      if (pinchTimerRef.current) {
        clearTimeout(pinchTimerRef.current);
        pinchTimerRef.current = null;
      }
      setCameraReady(false);
      setModelLoaded(false);
      return;
    }

    let cancelled = false;

    const init = async () => {
      let hands: MediaPipeHandsInstance | null = null;
      let stream: MediaStream | null = null;

      try {
        setLoadingStatus("Loading hand model…");

        const modelPromise = (async () => {
          await ensureHandsScriptLoaded();
          const HandsCtor = getHandsCtor();
          if (!HandsCtor) {
            throw new Error("MediaPipe Hands script not loaded");
          }

          const nextHands = new HandsCtor({
            locateFile: (file) =>
              `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${MEDIAPIPE_HANDS_VERSION}/${file}`,
          });
          nextHands.setOptions({
            maxNumHands: 2,
            modelComplexity: 0,
            minDetectionConfidence: 0.6,
            minTrackingConfidence: 0.5,
          });
          nextHands.onResults(onResults);

          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = 640;
          tempCanvas.height = 480;
          await nextHands.send({ image: tempCanvas });
          return nextHands;
        })();

        const cameraPromise = (async () => {
          setLoadingStatus((prev) =>
            prev.includes("model") ? "Loading model… Starting camera…" : "Starting camera…"
          );
          return getCameraStream();
        })();

        [hands, stream] = await Promise.all([modelPromise, cameraPromise]);

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          hands.close();
          return;
        }

        handsRef.current = hands;
        setModelLoaded(true);
        setLoadingStatus("Starting camera…");

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setCameraReady(true);
        setLoadingStatus("");
        animFrameRef.current = requestAnimationFrame(animationLoop);
        detectLoop();
      } catch (err) {
        console.error("Hand tracking init failed:", err);
        stream?.getTracks().forEach((track) => track.stop());
        hands?.close();
        setLoadingStatus(getGestureInitMessage(err));
      }
    };

    init();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled, onResults, animationLoop, detectLoop]);

  const cursorBg =
    cursorMode === "pinch"
      ? "hsl(var(--primary))"
      : "hsl(var(--foreground) / 0.3)";

  const pinchHoldSeconds = Math.max(0.2, Math.round((PINCH_CLICK_HOLD_MS / 1000) * 10) / 10);
  const pinchHoldLabel = `~${pinchHoldSeconds}s`;

  const dispatchGestureClick = (el: Element, clientX: number, clientY: number) => {
    const common = {
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
    };

    // Many UI libs (including Radix Dialog) rely on pointerdown/mousedown for outside-click dismissal.
    // Dispatch a realistic sequence so pinch behaves like a normal click.
    if (typeof PointerEvent === "function") {
      el.dispatchEvent(
        new PointerEvent("pointerdown", {
          ...common,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
          button: 0,
          buttons: 1,
        })
      );
      el.dispatchEvent(
        new PointerEvent("pointerup", {
          ...common,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
          button: 0,
          buttons: 0,
        })
      );
    }

    el.dispatchEvent(new MouseEvent("mousedown", { ...common, button: 0, buttons: 1 }));
    el.dispatchEvent(new MouseEvent("mouseup", { ...common, button: 0, buttons: 0 }));
    el.dispatchEvent(new MouseEvent("click", { ...common, button: 0 }));
  };

  return (
    <>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        width={640}
        height={480}
        playsInline
        muted
      />

      {/* === Framer Motion Cursor === */}
      <AnimatePresence>
        {enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 z-[10001] pointer-events-none"
            style={{
              x: springX,
              y: springY,
              willChange: "transform",
            }}
          >
            <motion.div
              animate={{
                scale: isPulsing ? [1, 1.8, 1] : cursorMode === "pinch" ? 0.6 : 1,
                backgroundColor: cursorBg,
              }}
              transition={
                isSnappingRef.current
                  ? { type: "spring", stiffness: 400, damping: 25 }
                  : { duration: 0.15 }
              }
              className="rounded-full backdrop-blur-sm border border-foreground/20"
              style={{
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Gesture Toast (Home / Back) === */}
      <AnimatePresence>
        {gestureToast && enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] px-6 py-3 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
          >
            <span className="text-sm font-medium tracking-wider uppercase text-foreground">
              {gestureToast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Scroll Zone Indicators === */}
      <AnimatePresence>
        {showScrollZones && showTopZone && enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[9998] h-[25vh] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--primary) / 0.15), transparent)",
            }}
          >
            <div className="flex items-center justify-center pt-6">
              <span className="text-xs tracking-wider uppercase text-muted-foreground bg-card/90 backdrop-blur-xl px-4 py-2 rounded-full border border-border/50">
                ⬆️ Scrolling Up
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollZones && showBottomZone && enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-[9998] h-[25vh] pointer-events-none"
            style={{
              background: "linear-gradient(to top, hsl(var(--primary) / 0.15), transparent)",
            }}
          >
            <div className="flex items-center justify-center pb-6 h-full items-end">
              <span className="text-xs tracking-wider uppercase text-muted-foreground bg-card/90 backdrop-blur-xl px-4 py-2 rounded-full border border-border/50">
                ⬇️ Scrolling Down
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinch-to-top zone hint (single finger mode) */}
      <AnimatePresence>
        {!showScrollZones && showTopZone && enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] px-4 py-2 rounded-full border border-border/50 bg-card/90 backdrop-blur-xl shadow-lg"
          >
            <span className="text-xs tracking-wider uppercase text-muted-foreground">
              🤏 Pinch to Scroll to Top
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug canvas */}
      <AnimatePresence>
        {enabled && showDebug && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            width={640}
            height={480}
            className="fixed bottom-16 right-4 z-[9998] rounded-lg border border-border/50 pointer-events-none"
            style={{ width: 200, height: 150 }}
          />
        )}
      </AnimatePresence>

      {/* Gesture Instructions Modal (center) */}
      <Dialog open={enabled && helpOpen} onOpenChange={(open) => setHelpOpen(open)}>
        <DialogContent className="max-w-lg w-[92vw]">
          <DialogHeader>
            <DialogTitle>Hand gestures</DialogTitle>
            <DialogDescription>
              Pinch outside this modal to dismiss. Tap the info button next to the toggle to reopen.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">☝️</span>
              <div>
                <p className="text-sm font-medium text-foreground">Point (hover)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Move the cursor and hover to activate UI (tabs, buttons).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">👌</span>
              <div>
                <p className="text-sm font-medium text-foreground">Pinch hold (click)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hold {pinchHoldLabel} to click the highlighted target.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">✌️</span>
              <div>
                <p className="text-sm font-medium text-foreground">Two fingers (scroll)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Raise index + middle; move toward top/bottom edge to scroll.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🖐️</span>
              <div>
                <p className="text-sm font-medium text-foreground">Open palm (home)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hold open palm for 1s to go home.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🤙</span>
              <div>
                <p className="text-sm font-medium text-foreground">Pinky up (back)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Raise your pinky finger to go back.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="rounded-full bg-foreground text-background px-4 py-2 text-xs tracking-wider uppercase hover:bg-foreground/90 transition-colors interactive"
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toggle UI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-4 right-4 z-[9997] flex items-center gap-2 rounded-full px-3 py-2 border border-border/50 bg-card/80 backdrop-blur-md shadow-lg"
      >
        {enabled && (
          <button
            type="button"
            onClick={() => setHelpOpen(true)}
            className="w-6 h-6 rounded-full border border-border/50 bg-background/20 hover:bg-background/30 transition-colors text-[10px] text-muted-foreground hover:text-foreground flex items-center justify-center interactive"
            aria-label="Show gesture instructions"
            title="Info"
          >
            i
          </button>
        )}
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            enabled && cameraReady
              ? "bg-green-500 animate-pulse"
              : enabled && modelLoaded
              ? "bg-yellow-500 animate-pulse"
              : enabled
              ? "bg-orange-500 animate-pulse"
              : "bg-muted-foreground/30"
          }`}
        />
        <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
          {enabled
            ? cameraReady
              ? "Tracking"
              : loadingStatus || "Initializing…"
            : "Gesture"}
        </span>
        <button
          onClick={() => setEnabled((p) => !p)}
          className={`ml-1 w-8 h-4 rounded-full relative transition-colors ${
            enabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-primary-foreground shadow transition-transform ${
              enabled ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </motion.div>
    </>
  );
};

function drawDebugSkeleton(
  canvas: HTMLCanvasElement,
  landmarks: NormalizedLandmarkList
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [5, 9], [9, 13], [13, 17],
  ];

  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 1.5;

  for (const [a, b] of connections) {
    const la = landmarks[a];
    const lb = landmarks[b];
    ctx.beginPath();
    ctx.moveTo(la.x * canvas.width, la.y * canvas.height);
    ctx.lineTo(lb.x * canvas.width, lb.y * canvas.height);
    ctx.stroke();
  }

  for (const lm of landmarks) {
    ctx.beginPath();
    ctx.arc(lm.x * canvas.width, lm.y * canvas.height, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
  }
}

export default HandGestureManager;
