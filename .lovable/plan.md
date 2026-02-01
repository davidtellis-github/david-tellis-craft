

## Improve Wedding Verse UI Screens Gallery

Based on the current simple stacked layout and the design preferences, here are the improvements for a better viewing experience.

### Current State

- Images are displayed in a basic vertical stack with rounded corners
- No hover effects or interactivity
- No lightbox for viewing images in full screen
- Basic spacing between images

### Proposed Improvements

1. **Add Lightbox/Dialog for Full-Screen Viewing**
   - Click any image to open it in a full-screen modal
   - Smooth transition and backdrop blur for focus

2. **Enhanced Hover Effects**
   - Subtle scale animation on hover (scale 1.02)
   - Overlay with expand icon indicator
   - Smooth shadow transition on hover

3. **Improved Visual Treatment**
   - Add subtle border with hover state enhancement
   - Slightly muted background for image containers
   - Larger shadows matching the design system (shadow-2xl)

4. **Better Spacing and Layout**
   - Increase gap between images (space-y-8 instead of space-y-6)
   - Add padding inside containers for breathing room

### Technical Details

**File: `src/pages/ProjectDetails.tsx`**

Changes to the Wedding Verse UI gallery section (around lines 268-288):

- Import `useState` for lightbox state management
- Import `Dialog` and `DialogContent` from `@/components/ui/dialog`
- Add state to track selected image for lightbox
- Update the image container with:
  - `cursor-pointer` for clickability indication
  - `group` class for hover state management
  - Hover overlay with expand icon
  - Subtle scale and shadow transitions
- Add Dialog component for full-screen image viewing
- Improve container styling with `bg-muted/30 border border-border/40` consistent with Gallery3D component

