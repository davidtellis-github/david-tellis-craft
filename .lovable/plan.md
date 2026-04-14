

## Gallery Section — Single View, No Scroll

**Problem:** The gallery section currently shows all 17 images in a scrollable container, making it too long. The user wants a fixed-height, non-scrollable preview that encourages clicking "View all."

### Changes to `src/components/portfolio/Gallery3D.tsx`

- Remove `overflow-y-auto` and `max-h-[80vh]` from the masonry container
- Wrap the masonry grid in a fixed-height container (`max-h-[70vh] overflow-hidden`) so it shows only what fits in one screen
- Add a gradient fade at the bottom to hint there's more content
- The "View all" button already exists — no changes needed there
- Optionally limit `previewImages` to ~8–10 items on the homepage to reduce DOM size

### Files to change
- `src/components/portfolio/Gallery3D.tsx`

