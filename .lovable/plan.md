

## Make Grid Images Hug Their Height

**Problem:** CSS Grid's default `align-items: stretch` forces all cards in a row to the same height, adding empty space below shorter images.

**Fix in `src/components/portfolio/Gallery3D.tsx`:**
- Add `items-start` to the grid container so each card only takes the height its image needs
- This single class change ensures each card hugs its image's natural height

