import { useRef, useCallback } from "react";

interface SnapTarget {
  x: number;
  y: number;
  element: Element;
}

const SNAP_ACQUIRE_RADIUS = 80;
const SNAP_RELEASE_RADIUS = 120;
const SNAP_SWITCH_RATIO = 0.75;

export function useMagneticSnap() {
  const snapTargetRef = useRef<SnapTarget | null>(null);
  const isSnappingRef = useRef(false);
  const cachedRectsRef = useRef<{ el: Element; cx: number; cy: number }[]>([]);
  const lastCacheTime = useRef(0);
  const prevHoveredRef = useRef<Element | null>(null);
  const CACHE_INTERVAL = 200;

  const dispatchHoverEvents = useCallback(
    (prevEl: Element | null, nextEl: Element | null, clientX: number, clientY: number) => {
      // React's onMouseEnter/onMouseLeave are synthesized from native mouseover/mouseout.
      // Dispatching these allows gesture-driven cursor movement to trigger hover behavior.
      if (prevEl && prevEl !== nextEl) {
        prevEl.dispatchEvent(
          new MouseEvent("mouseout", {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            relatedTarget: nextEl as EventTarget | null,
          })
        );
      }
      if (nextEl && prevEl !== nextEl) {
        nextEl.dispatchEvent(
          new MouseEvent("mouseover", {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            relatedTarget: prevEl as EventTarget | null,
          })
        );
      }
    },
    []
  );

  const refreshCache = useCallback(() => {
    const now = performance.now();
    if (now - lastCacheTime.current < CACHE_INTERVAL) return;
    lastCacheTime.current = now;

    const elements = document.querySelectorAll<HTMLElement>(
      [
        ".interactive",
        "a[href]",
        "button",
        "[role='button']",
        "[role='link']",
        "summary",
        "input[type='button']",
        "input[type='submit']",
        "input[type='reset']",
        "[tabindex]:not([tabindex='-1'])",
      ].join(",")
    );
    const rects: { el: Element; cx: number; cy: number }[] = [];
    elements.forEach((el) => {
      if (el.closest('[data-gesture-snap="false"]')) return;

      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.pointerEvents === "none") return;

      if (el instanceof HTMLButtonElement && el.disabled) return;
      if (el.getAttribute("aria-disabled") === "true") return;

      // Skip elements with no layout box.
      if (el.getClientRects().length === 0) return;

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

      const isTopmostAtPoint = (el: Element, x: number, y: number) => {
        const top = document.elementFromPoint(x, y);
        return top === el || (top !== null && el.contains(top));
      };

      let closest: SnapTarget | null = null;
      let closestDist = SNAP_ACQUIRE_RADIUS;

      const currentHovered = prevHoveredRef.current;
      let current: { el: Element; cx: number; cy: number; dist: number } | null = null;

      for (const { el, cx, cy } of cachedRectsRef.current) {
        const dist = Math.sqrt((cursorX - cx) ** 2 + (cursorY - cy) ** 2);
        if (el === currentHovered) current = { el, cx, cy, dist };
        if (dist < closestDist) {
          closestDist = dist;
          closest = { x: cx, y: cy, element: el };
        }
      }

      if (closest && !isTopmostAtPoint(closest.element, closest.x, closest.y)) {
        closest = null;
      }
      if (current && !isTopmostAtPoint(current.el, current.cx, current.cy)) {
        current = null;
      }

      // Hysteresis: keep current snapped element until the cursor clearly "leaves" it.
      if (current && current.dist <= SNAP_RELEASE_RADIUS) {
        if (!closest) {
          closest = { x: current.cx, y: current.cy, element: current.el };
        } else if (closest.element !== current.el) {
          const shouldSwitch = closestDist < current.dist * SNAP_SWITCH_RATIO;
          if (!shouldSwitch) {
            closest = { x: current.cx, y: current.cy, element: current.el };
          }
        }
      }

      // Manage hover class on snapped element
      const newHovered = closest?.element ?? null;
      if (newHovered !== prevHoveredRef.current) {
        const prevHovered = prevHoveredRef.current;
        prevHoveredRef.current?.classList.remove("gesture-hover");
        newHovered?.classList.add("gesture-hover");
        prevHoveredRef.current = newHovered;
        dispatchHoverEvents(prevHovered, newHovered, closest?.x ?? cursorX, closest?.y ?? cursorY);
      }

      snapTargetRef.current = closest;
      isSnappingRef.current = closest !== null;
      return closest;
    },
    [refreshCache, dispatchHoverEvents]
  );

  const clearHover = useCallback(() => {
    const prevHovered = prevHoveredRef.current;
    prevHoveredRef.current?.classList.remove("gesture-hover");
    prevHoveredRef.current = null;
    if (prevHovered) {
      prevHovered.dispatchEvent(
        new MouseEvent("mouseout", { bubbles: true, cancelable: true, relatedTarget: null })
      );
    }
  }, []);

  return { findSnapTarget, snapTargetRef, isSnappingRef, clearHover };
}
