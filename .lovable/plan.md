

## Fix: Project pages not scrolling to top on navigation

### Problem
When clicking a project card from the home page or portfolio, the project detail page lands in the middle of the page instead of the top. This happens because there is no `window.scrollTo(0, 0)` call when the ProjectDetails component mounts. The Portfolio page already has this fix, but ProjectDetails is missing it.

### Solution
Add a `useEffect` hook in `src/pages/ProjectDetails.tsx` that scrolls to the top of the page when the component mounts or when the `slug` parameter changes (for navigating between projects).

### Technical Details

**File: `src/pages/ProjectDetails.tsx`**

Add a scroll-to-top effect inside the component, alongside the existing SEO `useEffect`:

```tsx
// Scroll to top when component mounts or slug changes
useEffect(() => {
  window.scrollTo(0, 0);
}, [slug]);
```

This single line change ensures the page always starts at the overview/top when navigating to any project.
