import { useEffect, useMemo, useState } from "react";
import { X, ArrowRight } from "lucide-react";

/**
 * Zeke — the Zebros guide mascot.
 *
 * A friendly zebra that peeks in from the bottom-left and "pops out" now and
 * then with a speech bubble: how to use the site, what the team is doing right
 * now, and what to check out next. Tip set is page-aware (via `active`).
 *
 * Modes: "peek" (just the zebra's head showing, gently bobbing) and "open"
 * (full zebra + speech bubble). It auto-opens shortly after load, auto-collapses
 * after a while, and re-pops occasionally while peeking. Tap the zebra to summon
 * it; tap × to send it back to peeking.
 */
type Tip = { text: string; cta?: { label: string; href: string } };

const COMMON: Tip[] = [
  { text: "Tap the menu in the top-left corner to jump anywhere on the site." },
  {
    text: "Right now we're building this season's drivetrain and lining up sponsors.",
    cta: { label: "Read the blog", href: "/blog.html" },
  },
  {
    text: "Want to meet the humans behind the robot?",
    cta: { label: "Meet the team", href: "/team.html" },
  },
];

const BY_PAGE: Record<string, Tip[]> = {
  "/": [
    { text: "Hey, I'm Zeke! Welcome to Team 30415. Let me show you around. 🦓" },
    { text: "New here? Here's our story and what we actually do.", cta: { label: "About us", href: "/about.html" } },
    { text: "Curious how last year went?", cta: { label: "Past seasons", href: "/past-seasons.html" } },
  ],
  "/team.html": [
    { text: "Tap any teammate's card to read their full bio." },
    { text: "Everyone here owns a role — programming, CAD, outreach, and more." },
  ],
  "/blog.html": [
    { text: "This is our week-by-week progress — the newest update is up top." },
    { text: "We just kicked off the drivetrain build. More soon!" },
  ],
  "/about.html": [
    { text: "This is who we are and why we got into robotics." },
    { text: "Like what we do? You can help us keep going.", cta: { label: "Sponsor us", href: "/sponsors.html" } },
  ],
  "/coaches.html": [
    { text: "These are the mentors who keep us on track. Tap a card for their bio." },
  ],
  "/past-seasons.html": [
    { text: "Here's how past seasons went — awards, robots, and lessons learned." },
  ],
  "/sponsors.html": [
    { text: "Sponsors help us pay for parts and travel. Thank you! 💖" },
    { text: "Want to talk about sponsoring the team?", cta: { label: "Email us", href: "mailto:infocary@zebrarobotics.com" } },
  ],
};

export function ZebraGuide({ active = "/" }: { active?: string }) {
  const tips = useMemo<Tip[]>(
    () => [...(BY_PAGE[active] ?? []), ...COMMON],
    [active]
  );

  const [mode, setMode] = useState<"peek" | "open">("peek");
  const [idx, setIdx] = useState(0);

  // First pop-out shortly after the page settles.
  useEffect(() => {
    const t = setTimeout(() => setMode("open"), 2600);
    return () => clearTimeout(t);
  }, []);

  // Auto-collapse to peeking after the user has had time to read.
  useEffect(() => {
    if (mode !== "open") return;
    const t = setTimeout(() => setMode("peek"), 15000);
    return () => clearTimeout(t);
  }, [mode, idx]);

  // Occasionally re-pop with the next tip while peeking.
  useEffect(() => {
    const iv = setInterval(() => {
      setMode((m) => {
        if (m === "peek") {
          setIdx((i) => (i + 1) % tips.length);
          return "open";
        }
        return m;
      });
    }, 55000);
    return () => clearInterval(iv);
  }, [tips.length]);

  const open = mode === "open";
  const tip = tips[idx % tips.length];

  const nextTip = () => {
    setIdx((i) => (i + 1) % tips.length);
    setMode("open");
  };

  return (
    <div className="fixed bottom-0 left-2 z-[100] flex items-end gap-2 sm:left-4">
      {/* Zebra mascot — tap to summon / it bobs while peeking */}
      <button
        type="button"
        onClick={() => setMode(open ? "peek" : "open")}
        aria-label={open ? "Hide the guide" : "Open the Zebros guide"}
        className="relative shrink-0 origin-bottom transition-transform duration-500 ease-out"
        style={{ transform: open ? "translateY(0)" : "translateY(46%)" }}
      >
        <img
          src="/img/mascot-zebra.png"
          alt="Zeke, the Zebros guide"
          className={`w-24 select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:w-28 ${
            open ? "" : "zeke-bob"
          }`}
          draggable={false}
        />
        {/* little attention dot while peeking */}
        {!open && (
          <span className="absolute right-3 top-3 h-3 w-3 animate-ping rounded-full bg-primary" />
        )}
      </button>

      {/* Speech bubble */}
      <div
        aria-live="polite"
        className={`relative mb-6 max-w-[15rem] origin-bottom-left rounded-2xl liquid-glass p-3 pr-8 text-left transition-all duration-300 sm:max-w-xs ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMode("peek")}
          aria-label="Dismiss"
          className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-foreground/50 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <p className="text-sm font-semibold leading-snug text-white">{tip.text}</p>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          {tip.cta ? (
            <a
              href={tip.cta.href}
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:brightness-110"
            >
              {tip.cta.label}
              <ArrowRight className="h-3 w-3" />
            </a>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={nextTip}
            className="text-xs font-medium text-primary hover:text-white"
          >
            Next tip →
          </button>
        </div>
      </div>
    </div>
  );
}
