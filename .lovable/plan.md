

## Fix: Scroll Re-entry Jump

**Problem**: When the user lifts their hand to reposition for another scroll, the upward movement is interpreted as a scroll command, causing an unwanted reverse scroll.

**Solution**: Detect hand re-entry and ignore the first frame of movement after a gap. Two mechanisms:

1. **Large delta threshold**: If `deltaY` between frames exceeds ~80px (indicating the hand left and re-entered at a different position), reset `prevScreenYRef` instead of scrolling. This treats it as a "new gesture start."

2. **Frame gap detection**: Track a `lastDetectionTime` ref. If more than ~150ms has passed since the last detection (hand was briefly out of frame), reset `prevScreenYRef` to `null` so the next frame becomes a new baseline rather than triggering a scroll.

**File**: `src/components/portfolio/HandGestureManager.tsx`
- Add `lastDetectionTimeRef = useRef<number>(0)`
- In the scroll logic block, check `Date.now() - lastDetectionTimeRef.current > 150` → if true, skip scroll and just set `prevScreenYRef = screenY`
- Also check `Math.abs(deltaY) > 80` → treat as repositioning, reset baseline
- Update `lastDetectionTimeRef.current = Date.now()` each frame a hand is detected

