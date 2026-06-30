import { useEffect, useState } from "react";

/**
 * Returns true on small / touch screens. Used to swap high-render, heavily
 * animated desktop experiences (WebGL liquid background, gooey morphing text,
 * the skewed team-card fan, the radial orbital blog timeline) for static,
 * easy-to-read mobile equivalents.
 *
 * This is a client-only Vite app (no SSR), so we can read matchMedia
 * synchronously on the first render — no desktop-content flash on phones.
 */
export function useIsMobile(query = "(max-width: 767px)"): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
