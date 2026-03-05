

## Plan: Add `interactive` class to clickable elements + Index-finger-only detection

### Two changes:

**1. Add `interactive` class to all key clickable elements**

Files to modify:
- **`src/components/portfolio/WorkGrid.tsx`** — Add `interactive` to each project card's `<Link>` wrapper and the "View All Work" link
- **`src/components/portfolio/ProjectTimeline.tsx`** — Add `interactive` to each project row div
- **`src/components/portfolio/SideNav.tsx`** — Add `interactive` to each nav link (`<a>`), the Resume button, and the "All work" link
- **`src/components/portfolio/TimelineNav.tsx`** — Add `interactive` to each section button and the logo link
- **`src/pages/Portfolio.tsx`** — Add `interactive` to the back button link
- **`src/components/portfolio/Gallery3D.tsx`** — Add `interactive` to gallery image cards and prototype buttons
- **`src/components/portfolio/UIMasonryGallery.tsx`** — Add `interactive` to each masonry image item

**2. Index-finger-only gesture filter in HandGestureManager**

Currently the system tracks any detected hand. The fix: only respond when the index finger is extended and other fingers are curled (pointing gesture). When the full palm is open (all fingers extended), ignore the hand — treating it as a "resting/repositioning" pose.

**Detection logic** (added as a helper in `HandGestureManager.tsx`):
- A finger is "extended" if its tip landmark is above (lower y than) its PIP joint landmark
- **Index finger** (landmarks 8 vs 6): must be extended
- **Middle, Ring, Pinky** (landmarks 12/16/20 vs 10/14/18): at least 2 of 3 must be curled
- If the palm is open (all fingers out), skip processing for that frame — no cursor movement, no scrolling

This means: index finger out = active tracking. Open palm = paused. Pinch = click (already handled).

### Technical details

The finger extension check uses y-coordinates of MediaPipe landmarks:
```
isExtended(tip, pip) = tip.y < pip.y  // tip is above pip joint
```

If index is extended AND at least 2 of {middle, ring, pinky} are curled → "pointing" → process normally.
Otherwise → treat as no valid gesture (reset scroll baseline, clear hover).

