import React from "react";

/****
 * AmbientSpotlight
 * Subtle cursor-follow radial glow using design tokens.
 * Respects prefers-reduced-motion.
 */
const AmbientSpotlight: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        background:
          "radial-gradient(400px 400px at var(--spot-x, 50%) var(--spot-y, 20%), hsl(var(--foreground)/0.06), transparent 60%)",
      }}
    />
  );
};

export default AmbientSpotlight;
