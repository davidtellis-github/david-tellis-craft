

## Masonry-Style Gallery Layout

The reference image shows a Pinterest/Dribbble-style masonry layout where images have varying heights and pack tightly together without uniform row heights. The current CSS Grid with `items-start` still leaves column gaps because it uses row-based alignment.

### Changes to `src/components/portfolio/Gallery3D.tsx`

**Replace CSS Grid with CSS Columns (masonry effect)**
- Switch from `grid grid-cols-3` to `columns-1 sm:columns-2 lg:columns-3 gap-3`
- Each image card uses `break-inside-avoid mb-3` to prevent splitting across columns
- This creates a true masonry layout where images pack vertically with no wasted space, matching the reference image's staggered look
- Cards get slightly rounded corners (`rounded-xl`) with subtle border and hover effects to match the reference's card-like presentation

### Files to change
- `src/components/portfolio/Gallery3D.tsx` — swap grid container to CSS columns layout

