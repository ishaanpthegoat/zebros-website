import { lazy, Suspense, useEffect, useRef } from "react";

// Lazy-load the Three.js shader so it is code-split out of the initial bundle.
const ShaderAnimation = lazy(() =>
  import("@/components/ui/shader-animation").then((m) => ({ default: m.ShaderAnimation }))
);

/**
 * Fixed full-page shader (team colours), present on every page. It is masked
 * with a radial gradient centered on the logo's fixed position at the top of
 * the page, so the glow reads as light coming from the zebra rather than a
 * flat full-bleed background. Fades in once on mount.
 */
export function ShaderBackground({ opacity = 0.32 }: { opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.opacity = String(opacity);
    });
    if (reduce && ref.current) ref.current.style.opacity = String(opacity);
    return () => cancelAnimationFrame(raf);
  }, [opacity]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-[1400ms] ease-out"
      style={{
        opacity: 0,
        WebkitMaskImage:
          "radial-gradient(circle at 50% 0%, black 0%, black 28%, rgba(0,0,0,0.55) 50%, transparent 78%)",
        maskImage:
          "radial-gradient(circle at 50% 0%, black 0%, black 28%, rgba(0,0,0,0.55) 50%, transparent 78%)",
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ShaderAnimation />
      </Suspense>
    </div>
  );
}
