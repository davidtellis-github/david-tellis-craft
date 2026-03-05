

## Why Gesture Loading is Slow

The delay comes from **two sequential network-heavy steps** when gestures are enabled:

1. **MediaPipe WASM model download** — The `Hands` constructor fetches multiple large files from `cdn.jsdelivr.net` (WASM binary ~4MB + model files). The line `await hands.send({ image: tempCanvas })` forces a full model initialization before proceeding.
2. **Camera stream** — Only after the model loads does it request `getUserMedia`, adding another wait.

These files are **not cached between sessions** by default (depends on browser/CDN headers), so every page load re-downloads them.

## Plan to Speed Up Gesture Loading

### 1. Preload MediaPipe assets on page load
Add `<link rel="preload">` tags in `index.html` for the critical MediaPipe WASM/JS files so the browser starts fetching them immediately, even before the user enables gestures.

### 2. Parallelize model + camera initialization
Currently camera waits for model. Start both in parallel — the camera stream can be ready while the model is still loading, saving ~1-2 seconds.

### 3. Use lower model complexity (already 0 — good)
Already using `modelComplexity: 0`, which is optimal.

### 4. Add a loading progress indicator
Show a more informative loading state (e.g., "Loading hand model..." → "Starting camera...") so the user knows progress is happening.

### Files to change
- **`index.html`** — Add `<link rel="preload">` for MediaPipe WASM files
- **`src/components/portfolio/HandGestureManager.tsx`** — Parallelize model + camera init, add loading progress states

