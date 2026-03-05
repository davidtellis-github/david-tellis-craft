

## Technical Refinement: Professional Hand Gesture UI

This plan covers 7 enhancements to the hand-tracking system, all within `HandGestureManager.tsx` plus a new `useMagneticSnap` hook.

### 1. One Euro Filter (Noise Reduction)
Replace the fixed `LERP_FACTOR = 0.1` with a velocity-adaptive lerp. Track frame-to-frame velocity of the target position. Low velocity → lerp 0.05 (heavy smoothing, stops shaking). High velocity → lerp 0.2 (responsive tracking). Velocity threshold at ~200px/frame.

### 2. Conditional Camera Activation
Restructure the init flow: load the MediaPipe Hands model first, only request `getUserMedia` after model is ready. Add a `modelLoaded` state. Show a "Loading Tracker..." skeleton in the toggle UI while loading. Camera stream starts only after model loads.

### 3. Pinch-Lock Cursor
When `isPinching` is true, freeze cursor position (don't update `targetRef` from hand landmarks). Only track `deltaY` for scrolling via `window.scrollBy`. This prevents cursor drift during scroll gestures.

### 4. Magnetic Snapping Hook
Create `src/hooks/useMagneticSnap.ts`:
- Uses `requestAnimationFrame` to query all `.interactive` elements via `document.querySelectorAll('.interactive')`
- Returns the nearest element center if cursor is within 60px
- The animation loop in `HandGestureManager` will override the cursor target with the snap point when active
- Cursor gets a spring transition via Framer Motion when snapping

### 5. Active Zone (Top 10%)
In `onResults`, check if `indexTip.y < 0.1`. If so, set `inTopZone = true` and render a "Scroll to Top" tooltip. If user pinches in this zone, trigger `window.scrollTo({ top: 0, behavior: 'smooth' })` instead of normal pinch behavior.

### 6. Visual Feedback (Framer Motion Cursor)
Replace the direct DOM manipulation cursor with Framer Motion `motion.div` using `animate` prop driven by state. Add:
- Spring transition when magnetically snapping
- Scale pulse keyframe on successful pinch-click
- Color transitions for mode changes (point/pinch/palm)

### 7. Hand Filtering
- Ignore hands with average `z > 0.1` (too far away)
- Filter `multiHandLandmarks` entries where the corresponding `multiHandedness` score is `< 0.7`

### Files to Create/Edit
- **Edit**: `src/components/portfolio/HandGestureManager.tsx` — All logic changes
- **Create**: `src/hooks/useMagneticSnap.ts` — Magnetic snap hook

### Technical Notes
- All cursor updates remain in `requestAnimationFrame` loop
- Velocity is computed as Euclidean distance between consecutive target positions
- Magnetic snap queries DOM each frame but is lightweight (querySelectorAll on a class)
- The Framer Motion cursor will use `useMotionValue` + `useTransform` for GPU-accelerated positioning

