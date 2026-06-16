import { lazy, Suspense, useEffect, useRef } from "react";

// Lazy-load the Three.js shader so it is code-split out of the initial bundle.
const ShaderAnimation = lazy(() =>
  import("@/components/ui/shader-animation").then((m) => ({ default: m.ShaderAnimation }))
);

/**
 * Fixed full-screen shader (team colours) behind the page. It stays invisible
 * at the top (so the homepage intro is unchanged) and fades in as you scroll.
 */
export function ShaderBackground({ maxOpacity = 0.38 }: { maxOpacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeStart = 60;
    const fadeEnd = 480;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const t = Math.min(Math.max((y - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      if (ref.current) ref.current.style.opacity = String((reduce ? 1 : t) * maxOpacity);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxOpacity]);

  return (
    <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none" style={{ opacity: 0 }} aria-hidden="true">
      <Suspense fallback={null}>
        <ShaderAnimation />
      </Suspense>
    </div>
  );
}
