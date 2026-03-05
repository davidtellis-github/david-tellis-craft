import React, { useRef, useEffect, useState, useCallback } from "react";
import { Hands, Results, NormalizedLandmarkList } from "@mediapipe/hands";
import { motion, AnimatePresence } from "framer-motion";

interface HandState {
  cursorX: number;
  cursorY: number;
  isPinching: boolean;
  isPalmOpen: boolean;
  landmarks: NormalizedLandmarkList | null;
}

const PINCH_START_THRESHOLD = 0.05;
const PINCH_END_THRESHOLD = 0.08;
const LERP_FACTOR = 0.1;
const CURSOR_SIZE = 24;
const PINCH_CLICK_HOLD_MS = 1000;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const euclideanDist = (
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number }
) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);

// Detect open palm: all 4 fingertips above their respective PIP joints (extended)
const isOpenPalm = (lm: NormalizedLandmarkList): boolean => {
  // Index(8>6), Middle(12>10), Ring(16>14), Pinky(20>18) — tip.y < pip.y means extended
  return (
    lm[8].y < lm[6].y &&
    lm[12].y < lm[10].y &&
    lm[16].y < lm[14].y &&
    lm[20].y < lm[18].y
  );
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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(
    () => sessionStorage.getItem("gestureOnboardingSeen") === "true"
  );

  // Mutable state for perf (no re-renders in the hot loop)
  const stateRef = useRef<HandState>({
    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2,
    isPinching: false,
    isPalmOpen: false,
    landmarks: null,
  });

  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pinchAnchorYRef = useRef<number | null>(null);
  const scrollAnchorRef = useRef<number>(0);
  const pinchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinchClickFiredRef = useRef(false);
  const pinchMovedRef = useRef(false);
  const palmAnchorYRef = useRef<number | null>(null);
  const palmScrollAnchorRef = useRef<number>(0);

  // Cursor DOM ref for direct manipulation (no React re-renders)
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  const onResults = useCallback((results: Results) => {
    const state = stateRef.current;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      state.landmarks = landmarks;

      const indexTip = landmarks[8]; // Index Finger Tip
      const thumbTip = landmarks[4]; // Thumb Tip

      // Map to screen coords (mirrored)
      const screenX = (1 - indexTip.x) * window.innerWidth;
      const screenY = indexTip.y * window.innerHeight;

      targetRef.current.x = screenX;
      targetRef.current.y = screenY;

      // Pinch detection
      const dist = euclideanDist(thumbTip, indexTip);
      const wasPinching = state.isPinching;

      if (!wasPinching && dist < PINCH_START_THRESHOLD) {
        state.isPinching = true;
        pinchAnchorYRef.current = screenY;
        scrollAnchorRef.current = window.scrollY;
        pinchMovedRef.current = false;
        pinchClickFiredRef.current = false;

        // Start hold timer for click
        pinchTimerRef.current = setTimeout(() => {
          if (!pinchMovedRef.current && !pinchClickFiredRef.current) {
            pinchClickFiredRef.current = true;
            const s = stateRef.current;
            const el = document.elementFromPoint(s.cursorX, s.cursorY);
            if (el) {
              el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, clientX: s.cursorX, clientY: s.cursorY }));
              // Visual feedback on cursor
              if (cursorInnerRef.current) {
                cursorInnerRef.current.style.boxShadow = "0 0 20px hsl(var(--primary) / 0.6)";
                setTimeout(() => {
                  if (cursorInnerRef.current) cursorInnerRef.current.style.boxShadow = "none";
                }, 300);
              }
            }
          }
        }, PINCH_CLICK_HOLD_MS);
      } else if (wasPinching && dist > PINCH_END_THRESHOLD) {
        state.isPinching = false;
        pinchAnchorYRef.current = null;
        if (pinchTimerRef.current) {
          clearTimeout(pinchTimerRef.current);
          pinchTimerRef.current = null;
        }
      }

      // Scroll while pinching (only if moved enough)
      if (state.isPinching && pinchAnchorYRef.current !== null) {
        const deltaY = screenY - pinchAnchorYRef.current;
        if (Math.abs(deltaY) > 10) {
          pinchMovedRef.current = true;
          if (pinchTimerRef.current) {
            clearTimeout(pinchTimerRef.current);
            pinchTimerRef.current = null;
          }
        }
        if (pinchMovedRef.current) {
          window.scrollTo({ top: scrollAnchorRef.current + deltaY * 2 });
        }
      }

      // Palm scroll detection (open hand, no pinch)
      const palmOpen = isOpenPalm(landmarks) && !state.isPinching;
      const wasPalmOpen = state.isPalmOpen;

      if (palmOpen && !wasPalmOpen) {
        state.isPalmOpen = true;
        // Use wrist (landmark 0) for stable palm tracking
        palmAnchorYRef.current = landmarks[0].y * window.innerHeight;
        palmScrollAnchorRef.current = window.scrollY;
      } else if (!palmOpen && wasPalmOpen) {
        state.isPalmOpen = false;
        palmAnchorYRef.current = null;
      }

      if (state.isPalmOpen && palmAnchorYRef.current !== null) {
        const palmY = landmarks[0].y * window.innerHeight;
        const deltaY = palmY - palmAnchorYRef.current;
        window.scrollTo({ top: palmScrollAnchorRef.current + deltaY * 3 });
      }
    } else {
      state.landmarks = null;
    }

    // Draw debug skeleton
    if (showDebug && canvasRef.current && state.landmarks) {
      drawDebugSkeleton(canvasRef.current, state.landmarks);
    }
  }, [showDebug]);

  // Animation loop for smooth cursor
  const animationLoop = useCallback(() => {
    const state = stateRef.current;
    state.cursorX = lerp(state.cursorX, targetRef.current.x, LERP_FACTOR);
    state.cursorY = lerp(state.cursorY, targetRef.current.y, LERP_FACTOR);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${state.cursorX - CURSOR_SIZE / 2}px, ${state.cursorY - CURSOR_SIZE / 2}px)`;
    }
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.transform = state.isPinching ? "scale(0.6)" : state.isPalmOpen ? "scale(1.3)" : "scale(1)";
      cursorInnerRef.current.style.background = state.isPinching
        ? "hsl(var(--primary))"
        : state.isPalmOpen
        ? "hsl(var(--primary) / 0.5)"
        : "hsl(var(--foreground) / 0.3)";
    }

    animFrameRef.current = requestAnimationFrame(animationLoop);
  }, []);

  // Webcam detection loop
  const detectLoop = useCallback(async () => {
    if (!videoRef.current || !handsRef.current || !enabled) return;
    if (videoRef.current.readyState >= 2) {
      await handsRef.current.send({ image: videoRef.current });
    }
    setTimeout(() => {
      if (enabled) detectLoop();
    }, 1000 / 30); // 30fps detection
  }, [enabled]);

  // Start/stop camera
  useEffect(() => {
    if (!enabled) {
      // Cleanup
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
      return;
    }

    let cancelled = false;

    const init = async () => {
      try {
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

        const hands = new Hands({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0, // fastest
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.5,
        });
        hands.onResults(onResults);
        handsRef.current = hands;

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

  return (
    <>
      {/* Hidden video for webcam capture */}
      <video
        ref={videoRef}
        style={{ display: "none" }}
        width={640}
        height={480}
        playsInline
        muted
      />

      {/* Virtual cursor */}
      <AnimatePresence>
        {enabled && cameraReady && (
          <motion.div
            ref={cursorRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{ willChange: "transform" }}
          >
            <div
              ref={cursorInnerRef}
              className="rounded-full backdrop-blur-sm border border-foreground/20 transition-colors duration-150"
              style={{
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
                background: "hsl(var(--foreground) / 0.3)",
                willChange: "transform, background",
                transition: "transform 0.15s ease-out, background 0.15s ease-out",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug canvas overlay */}
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
                <span className="text-base mt-0.5">🤏</span>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Pinch to Scroll</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Pinch &amp; drag up/down to scroll the page.
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
                <span className="text-base mt-0.5">🖐️</span>
                <div>
                  <p className="text-[11px] font-medium text-foreground">Open Palm to Scroll</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Open your hand flat and move up/down to scroll the page.
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

      {/* Camera Status Toggle - bottom-right */}
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
              : enabled
              ? "bg-yellow-500 animate-pulse"
              : "bg-muted-foreground/30"
          }`}
        />
        <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
          {enabled ? (cameraReady ? "Tracking" : "Loading…") : "Gesture"}
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

// Draw hand skeleton on debug canvas
function drawDebugSkeleton(
  canvas: HTMLCanvasElement,
  landmarks: NormalizedLandmarkList
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8],       // Index
    [0, 9], [9, 10], [10, 11], [11, 12],   // Middle
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
    [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
    [5, 9], [9, 13], [13, 17],             // Palm
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
