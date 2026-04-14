

## Gallery Image Preview Modal (macOS-style)

### Changes to `src/components/portfolio/Gallery3D.tsx`

**1. Make image containers hug content**
- Remove fixed height container (`h-[60vh]`), keep the scrollable grid but let cards naturally size to their images

**2. Add macOS-style lightbox modal**
- On image click, open a `Dialog` (full-screen overlay, dark backdrop)
- Modal layout:
  - **Top area**: Large preview of selected image, centered, with max-height constraint
  - **Navigation arrows**: Left/right chevron buttons overlaid on the preview (like macOS Quick Look)
  - **Bottom strip**: Horizontal scrollable thumbnail strip showing all images, with the active one highlighted (border/ring)
- Clicking a thumbnail or arrow navigates to that image
- Keyboard support: `ArrowLeft`/`ArrowRight` to navigate, `Escape` to close
- Active thumbnail auto-scrolls into view using `scrollIntoView`

**3. State management**
- `selectedIndex: number | null` — null = modal closed, number = which image is shown
- Navigation wraps around (last → first, first → last)

### Visual structure
```text
┌─────────────────────────────────┐
│           ✕ (close)             │
│                                 │
│   ◀   [  Large Preview  ]   ▶  │
│                                 │
│  ┌──┐ ┌──┐ ┌▓▓┐ ┌──┐ ┌──┐     │
│  │  │ │  │ │▓▓│ │  │ │  │ ··→  │
│  └──┘ └──┘ └▓▓┘ └──┘ └──┘     │
└─────────────────────────────────┘
```

### Files to change
- `src/components/portfolio/Gallery3D.tsx` — add Dialog modal with preview + thumbnail strip + keyboard nav

