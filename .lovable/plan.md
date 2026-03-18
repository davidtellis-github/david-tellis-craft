

## Mobile Hero Tab Improvements

**Goal:** Add visual polish to the hero tabs on mobile with a gap between tab list/content and an active dot indicator.

### Changes to `src/components/portfolio/Hero.tsx`:

1. **Add mobile gap between tabs and content**
   - Currently `Tabs` has `gap-0` in className
   - Change to `gap-0 lg:gap-0` with `max-lg:mt-4` on the content wrapper to add space only on mobile

2. **Add active dot indicator under tab label on mobile**
   - Modify `TabsTrigger` to include a small dot element that shows only on mobile
   - Use `hidden max-lg:block` for the dot and position it using a relative container
   - The dot will be a small `w-1 h-1 rounded-full` element that shows when `data-[state=active]`

3. **Implementation details:**
   - Wrap tab label content in a flex column to stack the label and dot vertically
   - The dot will be positioned centered under the text on mobile only
   - On desktop (lg+), the dot remains hidden

### Visual result:
```
[For anyone] [Recruiters] [Design Directors]...
      ●
Hey there, I design digital experiences...
```

