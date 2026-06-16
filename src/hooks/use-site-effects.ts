import { useEffect } from "react";

/**
 * Reimplements the legacy static-site scroll/animation behaviors for the
 * React home page: reveal-on-scroll, animated counters, navbar shrink,
 * scroll-progress bar, and the back-to-top button. The legacy `enhance.css`
 * / `styles.css` (linked globally) provide the matching styles.
 *
 * Everything created here is torn down on unmount so React StrictMode's
 * double-invoke in dev does not leave duplicates.
 */
export function useSiteEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const supportsIO = "IntersectionObserver" in window;

    /* ---- Reveal on scroll ---- */
    const reveals = document.querySelectorAll<HTMLElement>(".reveal, [data-reveal]");
    if (supportsIO) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
      );
      reveals.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    } else {
      reveals.forEach((el) => el.classList.add("in-view"));
    }

    /* ---- Animated counters ---- */
    const nums = document.querySelectorAll<HTMLElement>("[data-count]");
    if (supportsIO && nums.length) {
      const animate = (el: HTMLElement) => {
        const target = parseFloat(el.dataset.count || "0");
        const isFloat = !Number.isInteger(target);
        const duration = 1400;
        const start = performance.now();
        const step = (t: number) => {
          const progress = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = target * eased;
          el.textContent = isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = isFloat ? target.toFixed(1) : target.toLocaleString();
        };
        requestAnimationFrame(step);
      };
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target as HTMLElement);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      nums.forEach((n) => obs.observe(n));
      cleanups.push(() => obs.disconnect());
    } else {
      nums.forEach((n) => (n.textContent = n.dataset.count || ""));
    }

    /* ---- Navbar shrink + scroll-progress bar + back-to-top ---- */
    const nav = document.querySelector(".navbar");

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    const toTop = document.createElement("button");
    toTop.id = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML =
      '<svg class="ring" viewBox="0 0 56 56"><circle class="tt-track" cx="28" cy="28" r="25"/>' +
      '<circle class="tt-arc" cx="28" cy="28" r="25"/></svg><span class="tt-arrow">↑</span>';
    document.body.appendChild(toTop);
    const arc = toTop.querySelector<SVGCircleElement>(".tt-arc");
    const ARC_LEN = 157;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sh = document.documentElement.scrollHeight - window.innerHeight;
        const pct = sh > 0 ? window.scrollY / sh : 0;
        bar.style.width = (pct * 100).toFixed(2) + "%";
        if (arc) arc.style.strokeDashoffset = (ARC_LEN * (1 - pct)).toFixed(1);
        toTop.classList.toggle("show", window.scrollY > 500);
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
      toTop.remove();
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
