import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

/**
 * Liquid homescreen background — replaces the Three.js shader on the home page.
 *
 * A reflective WebGL liquid surface (threejs-components) whose source texture is
 * generated on the fly in the team colors (pink #ff1f8f + black), so the liquid
 * itself reads as Zebros pink/black. Heavy by design: it only mounts on desktop,
 * motion-allowed screens. On phones it renders nothing and the caller's static
 * gradient shows instead.
 */
const LIQUID_CDN =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js";

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app: { dispose?: () => void } | null = null;
    let cancelled = false;

    // Build a pink/black team-tinted gradient texture for the liquid to reflect.
    const tex = document.createElement("canvas");
    tex.width = 512;
    tex.height = 512;
    const ctx = tex.getContext("2d");
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 512, 512);
      g.addColorStop(0, "#000000");
      g.addColorStop(0.35, "#7a0030");
      g.addColorStop(0.55, "#ff1f8f");
      g.addColorStop(0.72, "#d6004f");
      g.addColorStop(1, "#000000");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 16;
      for (let i = -512; i < 1024; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    const imgUrl = tex.toDataURL("image/png");

    (async () => {
      try {
        const mod: any = await import(/* @vite-ignore */ LIQUID_CDN);
        if (cancelled) return;
        const LiquidBackgroundFactory = mod.default;
        app = LiquidBackgroundFactory(canvas);
        const a = app as any;
        a.loadImage(imgUrl);
        if (a.liquidPlane?.material) {
          a.liquidPlane.material.metalness = 0.8;
          a.liquidPlane.material.roughness = 0.22;
        }
        if (a.liquidPlane?.uniforms?.displacementScale) {
          a.liquidPlane.uniforms.displacementScale.value = 4;
        }
        a.setRain?.(false);
      } catch (e) {
        console.warn("Liquid background failed to load", e);
      }
    })();

    return () => {
      cancelled = true;
      try {
        app?.dispose?.();
      } catch {
        /* noop */
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Team-color tint + legibility overlay layered over the liquid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,31,143,0.30),transparent_60%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.35),rgba(10,10,10,0.1)_30%,rgba(10,10,10,0.92))]" />
    </div>
  );
}
