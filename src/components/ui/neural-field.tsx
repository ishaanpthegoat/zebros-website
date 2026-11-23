import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

type Point = { x: number; y: number; phase: number };

// Seeded geometry stays stable when selecting records or resizing the window.
function createField() {
  let seed = 30415;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const points: Point[] = Array.from({ length: 100 }, (_, index) => {
    const angle = index * 2.399963;
    const radius = 75 + Math.sqrt(random()) * 245;
    return { x: 360 + Math.cos(angle) * radius, y: 360 + Math.sin(angle) * radius, phase: random() * Math.PI * 2 };
  });
  const edges: [number, number][] = [];
  points.forEach((point, index) => {
    points.map((other, i) => ({ i, d: Math.hypot(point.x - other.x, point.y - other.y) }))
      .filter(({ i, d }) => i > index && d < 120)
      .sort((a, b) => a.d - b.d).slice(0, 3).forEach(({ i }) => edges.push([index, i]));
  });
  return { points, edges };
}
const field = createField();

export function NeuralField({ pointerX, pointerY, reducedMotion }: { pointerX: MotionValue<number>; pointerY: MotionValue<number>; reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let frame = 0;
    let visible = true;
    let time = 0;
    let previous = 0;
    let lastDraw = 0;
    const draw = () => {
      const ctx = context;
      ctx.clearRect(0, 0, 720, 720);
      const mouse = { x: 360 + pointerX.get() * 360, y: 360 + pointerY.get() * 360 };
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 210);
      glow.addColorStop(0, "rgba(34,211,238,0.09)"); glow.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, 720, 720);
      field.edges.forEach(([a, b], index) => {
        const from = field.points[a], to = field.points[b];
        const near = Math.max(0, 1 - Math.hypot((from.x + to.x) / 2 - mouse.x, (from.y + to.y) / 2 - mouse.y) / 180);
        const surge = reducedMotion ? 0 : Math.pow(Math.max(0, Math.sin(time * 0.7 + index * 1.7)), 22);
        const opacity = 0.07 + near * 0.24 + surge * 0.25;
        const dx = to.x - from.x, dy = to.y - from.y, length = Math.hypot(dx, dy);
        ctx.beginPath(); ctx.moveTo(from.x, from.y);
        for (let step = 1; step < 6; step++) {
          const fraction = step / 6;
          const jitter = Math.sin(index * 11 + step * 7 + Math.floor(time * 5)) * (1.2 + surge * 3);
          ctx.lineTo(from.x + dx * fraction - dy / length * jitter, from.y + dy * fraction + dx / length * jitter);
        }
        ctx.lineTo(to.x, to.y); ctx.strokeStyle = `rgba(103,232,249,${opacity})`; ctx.lineWidth = surge > 0.6 ? 1.1 : 0.65; ctx.stroke();
        if (!reducedMotion && index % 4 === 0) {
          const progress = (time * 0.16 + index * 0.17) % 1;
          ctx.beginPath(); ctx.arc(from.x + dx * progress, from.y + dy * progress, 1.2 + near, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(207,250,254,${0.3 + near * 0.5})`; ctx.fill();
        }
      });
      field.points.forEach((point) => {
        const pulse = reducedMotion ? 0.4 : 0.45 + Math.sin(time + point.phase) * 0.2;
        ctx.beginPath(); ctx.arc(point.x, point.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,243,252,${pulse})`; ctx.fill();
      });
    };
    const resize = () => {
      const size = canvas.getBoundingClientRect().width;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(size * ratio)); canvas.height = canvas.width;
      context.setTransform(canvas.width / 720, 0, 0, canvas.height / 720, 0, 0);
      draw();
    };
    const animate = (now: number) => {
      if (visible && !document.hidden && !reducedMotion && now - lastDraw > 32) {
        time += previous ? Math.min(now - previous, 80) / 1000 : 0;
        previous = now; lastDraw = now; draw();
      } else if (!visible || document.hidden) previous = 0;
      if (!reducedMotion) frame = requestAnimationFrame(animate);
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(canvas);
    resize(); if (!reducedMotion) frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); };
  }, [pointerX, pointerY, reducedMotion]);
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
