import React, { useRef, useEffect, useState, useCallback } from "react";
import { Hands, Results, NormalizedLandmarkList } from "@mediapipe/hands";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useMagneticSnap } from "@/hooks/useMagneticSnap";

interface HandState {
  cursorX: number;
  cursorY: number;
  isPinching: boolean;
  landmarks: NormalizedLandmarkList | null;
  inTopZone: boolean;
}

const PINCH_START_THRESHOLD = 0.05;
const PINCH_END_THRESHOLD = 0.08;
const CURSOR_SIZE = 24;
const PINCH_CLICK_HOLD_MS = 400;
const VELOCITY_THRESHOLD = 200;
const MIN_LERP = 0.05;
const MAX_LERP = 0.2;
const MIN_HAND_CONFIDENCE = 0.7;
const MAX_HAND_Z_DEPTH = 0.1;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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

  // Index must be out, and at least 2 of the other 3 must be curled
  const curledCount = [middleCurled, ringCurled, pinkyCurled].filter(Boolean).length;
  return indexOut && curledCount >= 2;
};


const HandGestureManager: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handsRef = useRef<Hands | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTopZone, setShowTopZone] = useState(false);
  const [cursorMode, setCursorMode] = useState<"point" | "pinch">("point");
  const [isPulsing, setIsPulsing] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(
    () => sessionStorage.getItem("gestureOnboardingSeen") === "true"
  );

  const { findSnapTarget, isSnappingRef, clearHover } = useMagneticSnap();

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
  });

  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const prevTargetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pinchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinchClickFiredRef = useRef(false);
  const prevScreenYRef = useRef<number | null>(null);
  const lastDetectionTimeRef = useRef<number>(0);
  const SCROLL_SPEED = 3;

  const onResults = useCallback((results: Results) => {
    const state = stateRef.current;

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
      // Skip processing if hand is open (not pointing)
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const dist = euclideanDist(thumbTip, indexTip);
      const isPinchGesture = dist < PINCH_END_THRESHOLD;

      if (!isPointingPose(landmarks) && !isPinchGesture) {
        // Open palm or non-pointing pose → pause tracking
        prevScreenYRef.current = null;
        clearHover();
        return;
      }

      const screenX = (1 - indexTip.x) * window.innerWidth;
      const screenY = indexTip.y * window.innerHeight;

      // === Active Zone (Top 10%) ===
      const inTopZone = indexTip.y < 0.1;
      if (inTopZone !== state.inTopZone) {
        state.inTopZone = inTopZone;
        setShowTopZone(inTopZone);
      }

      // Update target position
      targetRef.current.x = screenX;
      targetRef.current.y = screenY;

      // === Hand-driven scrolling with re-entry jump fix ===
      const now = Date.now();
      const timeSinceLast = now - lastDetectionTimeRef.current;
      lastDetectionTimeRef.current = now;

      if (!state.isPinching && prevScreenYRef.current !== null) {
        const deltaY = screenY - prevScreenYRef.current;
        const isReentry = timeSinceLast > 150 || Math.abs(deltaY) > 80;
        if (isReentry) {
          prevScreenYRef.current = screenY;
        } else if (Math.abs(deltaY) > 2) {
          window.scrollBy({ top: deltaY * SCROLL_SPEED, behavior: "instant" as ScrollBehavior });
        }
      }
      prevScreenYRef.current = screenY;

      // Pinch detection (for click only)
      const pinchDist = euclideanDist(thumbTip, indexTip);
      const wasPinching = state.isPinching;

      if (!wasPinching && pinchDist < PINCH_START_THRESHOLD) {
        state.isPinching = true;
        setCursorMode("pinch");

        // === Active Zone pinch → scroll to top ===
        if (state.inTopZone) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        pinchClickFiredRef.current = false;

        pinchTimerRef.current = setTimeout(() => {
          if (!pinchClickFiredRef.current) {
            pinchClickFiredRef.current = true;
            const s = stateRef.current;
            const el = document.elementFromPoint(s.cursorX, s.cursorY);
            if (el) {
              el.dispatchEvent(
                new MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  clientX: s.cursorX,
                  clientY: s.cursorY,
                })
              );
              setIsPulsing(true);
              setTimeout(() => setIsPulsing(false), 400);
            }
          }
        }, PINCH_CLICK_HOLD_MS);
      } else if (wasPinching && pinchDist > PINCH_END_THRESHOLD) {
        state.isPinching = false;
        setCursorMode("point");
        if (pinchTimerRef.current) {
          clearTimeout(pinchTimerRef.current);
          pinchTimerRef.current = null;
        }
      }
    } else {
      state.landmarks = null;
      prevScreenYRef.current = null;
      clearHover();
    }

    if (showDebug && canvasRef.current && state.landmarks) {
      drawDebugSkeleton(canvasRef.current, state.landmarks);
    }
  }, [showDebug]);

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
      setCameraReady(false);
      setModelLoaded(false);
      return;
    }

    let cancelled = false;

    const init = async () => {
      try {
        // Step 1: Load model FIRST
        const hands = new Hands({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 0,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.5,
        });
        hands.onResults(onResults);

        // Initialize model by sending a blank frame
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 640;
        tempCanvas.height = 480;
        await hands.send({ image: tempCanvas });

        if (cancelled) return;
        handsRef.current = hands;
        setModelLoaded(true);

        // Step 2: THEN request camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setCameraReady(true);
        if (!onboardingDismissed) {
          setShowOnboarding(true);
        }
        animFrameRef.current = requestAnimationFrame(animationLoop);
        detectLoop();
      } catch (err) {
        console.error("Hand tracking init failed:", err);
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
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
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

      {/* === Active Zone: Scroll to Top Tooltip === */}
      <AnimatePresence>
        {showTopZone && enabled && cameraReady && (
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

      {/* Onboarding Tooltip */}
      <AnimatePresence>
        {showOnboarding && enabled && cameraReady && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-16 right-4 z-[9998] w-64 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl p-4"
          >
            <button
              onClick={() => {
                setShowOnboarding(false);
                setOnboardingDismissed(true);
                sessionStorage.setItem("gestureOnboardingSeen", "true");
              }}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors text-xs"
            >
              ✕
            </button>
            <p className="text-xs font-semibold text-foreground mb-3 tracking-wider uppercase">
              Hand Gestures
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">☝️</span>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Point to Move</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Raise your index finger — the cursor follows its tip.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">👌</span>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Pinch &amp; Hold to Click</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Hold a pinch still for 1 second to click the element under the cursor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">🪲</span>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Debug Mode</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Tap "Debug" to see your hand skeleton overlay.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowOnboarding(false);
                setOnboardingDismissed(true);
                sessionStorage.setItem("gestureOnboardingSeen", "true");
              }}
              className="mt-3 w-full text-[10px] tracking-wider uppercase font-medium py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle UI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-4 right-4 z-[9997] flex items-center gap-2 rounded-full px-3 py-2 border border-border/50 bg-card/80 backdrop-blur-md shadow-lg"
      >
        {enabled && (
          <button
            onClick={() => setShowDebug((p) => !p)}
            className="text-[10px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors mr-1"
          >
            {showDebug ? "Hide" : "Debug"}
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
              : modelLoaded
              ? "Camera…"
              : "Loading Model…"
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
