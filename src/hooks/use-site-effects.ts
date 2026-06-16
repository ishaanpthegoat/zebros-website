import { useEffect } from "react";
import Lenis from "lenis";

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
    const reduceMotionScroll = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- Apple-like smooth scrolling (Lenis) ---- */
    let lenis: Lenis | null = null;
    if (!reduceMotionScroll) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      let lenisRaf = 0;
      const raf = (time: number) => {
        lenis?.raf(time);
        lenisRaf = requestAnimationFrame(raf);
      };
      lenisRaf = requestAnimationFrame(raf);
      cleanups.push(() => {
        cancelAnimationFrame(lenisRaf);
        lenis?.destroy();
        lenis = null;
      });
    }

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
    toTop.addEventListener("click", () => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

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

    /* ---- Season tabs (past-seasons page) ---- */
    const tabs = document.querySelectorAll<HTMLElement>(".team-tab");
    tabs.forEach((tab) => {
      const handler = () => {
        const id = tab.dataset.team;
        document.querySelectorAll(".team-tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".team-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById("panel-" + id)?.classList.add("active");
      };
      tab.addEventListener("click", handler);
      cleanups.push(() => tab.removeEventListener("click", handler));
    });

    /* ---- Profile modal (clickable people cards, e.g. coaches) ---- */
    const cards = document.querySelectorAll<HTMLElement>(".person-card[data-bio]");
    if (cards.length) {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML =
        '<div class="modal" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close profile">&times;</button>' +
        '<div class="modal-photo"><div class="placeholder-initials" data-modal-initials></div></div>' +
        '<div class="modal-body"><h2 class="modal-name" data-modal-name></h2><div class="modal-role" data-modal-role></div>' +
        '<p class="modal-bio" data-modal-bio></p><div class="modal-contact" data-modal-contact></div></div></div>';
      document.body.appendChild(overlay);
      const closeBtn = overlay.querySelector<HTMLElement>(".modal-close")!;
      const elPhoto = overlay.querySelector<HTMLElement>(".modal-photo")!;
      const elName = overlay.querySelector<HTMLElement>("[data-modal-name]")!;
      const elRole = overlay.querySelector<HTMLElement>("[data-modal-role]")!;
      const elBio = overlay.querySelector<HTMLElement>("[data-modal-bio]")!;
      const elContact = overlay.querySelector<HTMLElement>("[data-modal-contact]")!;

      const open = (card: HTMLElement) => {
        elPhoto.innerHTML = "";
        if (card.dataset.photo) {
          const img = document.createElement("img");
          img.src = card.dataset.photo;
          img.alt = card.dataset.name || "";
          elPhoto.appendChild(img);
        } else {
          const div = document.createElement("div");
          div.className = "placeholder-initials";
          div.textContent = card.dataset.initials || "";
          elPhoto.appendChild(div);
        }
        elName.textContent = card.dataset.name || "";
        elRole.textContent = card.dataset.role || "";
        elBio.textContent = card.dataset.bio || "";
        elContact.innerHTML = "";
        if (card.dataset.email) {
          const row = document.createElement("div");
          row.className = "modal-contact-item";
          row.innerHTML = `<strong>Email:</strong><a href="mailto:${card.dataset.email}">${card.dataset.email}</a>`;
          elContact.appendChild(row);
        }
        if (card.dataset.phone) {
          const row = document.createElement("div");
          row.className = "modal-contact-item";
          const tel = card.dataset.phone.replace(/[^0-9+]/g, "");
          row.innerHTML = `<strong>Phone:</strong><a href="tel:${tel}">${card.dataset.phone}</a>`;
          elContact.appendChild(row);
        }
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      };
      const close = () => {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
      };
      const cardHandlers: Array<() => void> = [];
      cards.forEach((card) => {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        const h = () => open(card);
        card.addEventListener("click", h);
        cardHandlers.push(() => card.removeEventListener("click", h));
      });
      closeBtn.addEventListener("click", close);
      const onOverlayClick = (e: MouseEvent) => { if (e.target === overlay) close(); };
      overlay.addEventListener("click", onOverlayClick);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
      document.addEventListener("keydown", onKey);
      cleanups.push(() => {
        cardHandlers.forEach((fn) => fn());
        document.removeEventListener("keydown", onKey);
        overlay.remove();
        document.body.classList.remove("modal-open");
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
