import { useEffect, useState, type PointerEvent } from "react";
import { useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion";

// Motion values keep pointer and rotation updates out of React's render loop.
export function useOrbitalMotion(rotating: boolean) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 160, damping: 24, mass: 0.8 };
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const x = useTransform(smoothX, [-1, 1], [-24, 24]);
  const y = useTransform(smoothY, [-1, 1], [-18, 18]);
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);
  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (value) => -value);
  const speed = useSpring(0, { stiffness: 100, damping: 24 });

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    speed.set(rotating && !reducedMotion ? 0.003 : 0);
    if (reducedMotion) {
      pointerX.set(0);
      pointerY.set(0);
      smoothX.jump(0);
      smoothY.jump(0);
      speed.jump(0);
    }
  }, [rotating, reducedMotion, speed, pointerX, pointerY, smoothX, smoothY]);

  useAnimationFrame((_, delta) => {
    if (reducedMotion || document.hidden || Math.abs(speed.get()) < 0.000001) return;
    rotation.set(rotation.get() + Math.min(delta, 50) * speed.get());
  });

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    pointerX.set(clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    pointerY.set(clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
  };

  return { reducedMotion, pointerX: smoothX, pointerY: smoothY, x, y, rotateX, rotateY, rotation, counterRotation, trackPointer, resetPointer };
}
