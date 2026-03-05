import { useRef, useCallback } from "react";

interface SnapTarget {
  x: number;
  y: number;
  element: Element;
}

const SNAP_RADIUS = 80;

export function useMagneticSnap() {
  const snapTargetRef = useRef<SnapTarget | null>(null);
  const isSnappingRef = useRef(false);
  const cachedRectsRef = useRef<{ el: Element; cx: number; cy: number }[]>([]);
  const lastCacheTime = useRef(0);
  const prevHoveredRef = useRef<Element | null>(null);
  const CACHE_INTERVAL = 200;

  const refreshCache = useCallback(() => {
    const now = performance.now();
    if (now - lastCacheTime.current < CACHE_INTERVAL) return;
    lastCacheTime.current = now;

    const elements = document.querySelectorAll(".interactive");
    const rects: { el: Element; cx: number; cy: number }[] = [];
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      rects.push({
        el,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      });
    });
    cachedRectsRef.current = rects;
  }, []);

  const findSnapTarget = useCallback(
    (cursorX: number, cursorY: number): SnapTarget | null => {
      refreshCache();

      let closest: SnapTarget | null = null;
      let minDist = SNAP_RADIUS;

      for (const { el, cx, cy } of cachedRectsRef.current) {
        const dist = Math.sqrt((cursorX - cx) ** 2 + (cursorY - cy) ** 2);
        if (dist < minDist) {
          minDist = dist;
          closest = { x: cx, y: cy, element: el };
        }
      }

      // Manage hover class on snapped element
      const newHovered = closest?.element ?? null;
      if (newHovered !== prevHoveredRef.current) {
        prevHoveredRef.current?.classList.remove("gesture-hover");
        newHovered?.classList.add("gesture-hover");
        prevHoveredRef.current = newHovered;
      }

      snapTargetRef.current = closest;
      isSnappingRef.current = closest !== null;
      return closest;
    },
    [refreshCache]
  );

  const clearHover = useCallback(() => {
    prevHoveredRef.current?.classList.remove("gesture-hover");
    prevHoveredRef.current = null;
  }, []);

  return { findSnapTarget, snapTargetRef, isSnappingRef, clearHover };
}
