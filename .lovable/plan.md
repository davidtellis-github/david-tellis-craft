

## Fix Resume Modal Visibility

The resume modal isn't displaying properly due to missing accessibility components required by Radix UI Dialog.

### What's Wrong

The console shows two errors:
- `DialogContent` requires a `DialogTitle` for screen reader users
- Missing `Description` or `aria-describedby` for DialogContent

These accessibility requirements from Radix UI can cause the modal to behave unexpectedly when not met.

### The Fix

Update `src/components/portfolio/ResumeModal.tsx` to:

1. Import `DialogHeader`, `DialogTitle`, and `DialogDescription` from the dialog component
2. Replace the plain `<h2>` tag with proper `DialogHeader` and `DialogTitle` components
3. Add a visually hidden `DialogDescription` for accessibility

### Changes

**File: `src/components/portfolio/ResumeModal.tsx`**

- Add imports for `DialogHeader`, `DialogTitle`, `DialogDescription`
- Wrap the header content in `DialogHeader` component
- Use `DialogTitle` instead of plain `<h2>`
- Add `DialogDescription` with `sr-only` class (visually hidden but accessible to screen readers)

This will resolve the accessibility warnings and ensure the modal renders correctly across all browsers.

