

## Fix Gallery Grid & Modal Image Sizing

### Changes to `src/components/portfolio/Gallery3D.tsx`

**1. Grid — let images hug their content**
- Remove `object-cover` from grid images, use `object-contain` so images aren't cropped and naturally size to their aspect ratio
- Remove the fixed `max-h-[65vh]` on the scroll container — keep `overflow-y-auto` but let the container grow based on content (use a reasonable cap like `max-h-[80vh]`)

**2. Modal — fixed height preview**
- Change the preview image from `max-h-[65vh]` to a fixed `h-[65vh]` with `object-contain` so the preview area stays consistent regardless of image aspect ratio
- Set the `DialogContent` to a fixed height (`h-[90vh]`) so the modal doesn't resize when switching between images

### Files to change
- `src/components/portfolio/Gallery3D.tsx`

