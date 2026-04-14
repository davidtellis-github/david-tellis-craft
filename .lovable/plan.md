

## Dedicated Gallery Page with Scroll-Triggered Navigation

**What it does:** When users scroll into the gallery section on the homepage, an animated transition navigates them to a new `/gallery` page. That page shows all UI images in a 4-column grid with a minimal top nav (logo + back button).

### Plan

**1. Create `/gallery` page — `src/pages/GalleryPage.tsx`**
- Top nav bar: logo (left) + "Back to Home" link (right), fixed, minimal, matching existing theme
- 4-column grid on `lg+` (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), small gap
- Merge all images from `Gallery3D` (4 items) and `UIMasonryGallery` (12 items) into one unified array
- Each card: rounded, hover scale, click opens lightbox Dialog
- Entry animation: staggered fade-in on mount

**2. Add scroll-triggered navigation in `Gallery3D.tsx`**
- Use Intersection Observer on the gallery section
- When the section enters viewport (e.g. 30% visible), trigger a scale-up + fade-out CSS animation (~500ms) on the gallery container
- After animation completes, programmatically navigate to `/gallery` using `useNavigate()`
- Add a flag so it only triggers once per session (sessionStorage) to avoid re-triggering on back navigation

**3. Register the route in `App.tsx`**
- Add `<Route path="/gallery" element={<GalleryPage />} />`

**4. Remove `UIMasonryGallery` from `Portfolio.tsx`**
- Since all images move to the dedicated gallery page

### Files to change
- `src/pages/GalleryPage.tsx` — new file (gallery grid + top nav)
- `src/components/portfolio/Gallery3D.tsx` — add scroll-triggered navigation animation
- `src/App.tsx` — add `/gallery` route
- `src/pages/Portfolio.tsx` — remove UIMasonryGallery section

