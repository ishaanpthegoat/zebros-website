import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";

/**
 * Zeke — the Zebros guide mascot.
 *
 * A friendly zebra that peeks in from a random edge and "pops out" now and then
 * with a speech bubble: how to use the site, what the team is doing right now,
 * and what to check out next. Tip set is page-aware (via `active`).
 *
 * Each time he pops he picks a random anchor (bottom-left / bottom-center /
 * bottom-right / left / right edge). While peeking, only part of him shows from
 * that edge and he bobs gently; tap him to summon, tap × to send him back.
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

/* Random spots Zeke can pop from. `peek` is the transform while hidden (pushed
   toward that edge so ~70% of him still shows); `reverse` puts the bubble on the
   other side so it stays on-screen. */
type Anchor = { pos: string; peek: string; reverse: boolean };
const ANCHORS: Anchor[] = [
  { pos: "bottom-0 left-2 sm:left-4", peek: "translateY(30%)", reverse: false },
  { pos: "bottom-0 left-1/2 -translate-x-1/2", peek: "translateY(30%)", reverse: false },
  { pos: "bottom-0 right-2 sm:right-4", peek: "translateY(30%)", reverse: true },
  // Side peeks crop ~half of him behind the screen edge (peeking round a corner)
  { pos: "top-1/2 -translate-y-1/2 left-0", peek: "translateX(-58%)", reverse: false },
  { pos: "top-1/2 -translate-y-1/2 right-0", peek: "translateX(58%)", reverse: true },
];

export function ZebraGuide({ active = "/" }: { active?: string }) {
  const tips = useMemo<Tip[]>(
    () => [...(BY_PAGE[active] ?? []), ...COMMON],
    [active]
  );

  const [mode, setMode] = useState<"peek" | "open">("peek");
  const [idx, setIdx] = useState(0);
  const [anchorIdx, setAnchorIdx] = useState(() =>
    Math.floor(Math.random() * ANCHORS.length)
  );

  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // Jump to a random spot different from the current one.
  const pickAnchor = () =>
    setAnchorIdx((cur) => {
      if (ANCHORS.length < 2) return 0;
      let n = cur;
      while (n === cur) n = Math.floor(Math.random() * ANCHORS.length);
      return n;
    });

  // First pop-out shortly after the page settles.
  useEffect(() => {
    const t = setTimeout(() => {
      pickAnchor();
      setMode("open");
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  // Auto-collapse to peeking after the user has had time to read.
  useEffect(() => {
    if (mode !== "open") return;
    const t = setTimeout(() => setMode("peek"), 15000);
    return () => clearTimeout(t);
  }, [mode, idx]);

  // Re-pop (in a new random spot) with the next tip while peeking. Spaced well
  // apart so he isn't constantly jumping around — once every couple of minutes.
  useEffect(() => {
    const iv = setInterval(() => {
      if (modeRef.current === "peek") {
        setIdx((i) => (i + 1) % tips.length);
        pickAnchor();
        setMode("open");
      }
    }, 120000);
    return () => clearInterval(iv);
  }, [tips.length]);

  const open = mode === "open";
  const tip = tips[idx % tips.length];
  const anchor = ANCHORS[anchorIdx];

  const toggle = () => {
    if (open) {
      setMode("peek");
    } else {
      pickAnchor();
      setMode("open");
    }
  };

  const nextTip = () => {
    setIdx((i) => (i + 1) % tips.length);
    setMode("open"); // keep the same spot while stepping through tips
  };

  return (
    <div
      className={`fixed z-[100] flex items-end gap-2 ${anchor.pos} ${
        anchor.reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Zebra mascot — tap to summon / it bobs while peeking */}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Hide the guide" : "Open the Zebros guide"}
        className="relative shrink-0 origin-bottom transition-transform duration-500 ease-out"
        style={{ transform: open ? "translate(0,0)" : anchor.peek }}
      >
        <img
          src="/img/mascot-zebra.png"
          alt="Zeke, the Zebros guide"
          className={`w-28 select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:w-36 ${
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
        className={`relative mb-6 max-w-[15rem] rounded-2xl liquid-glass p-3 pr-8 text-left transition-all duration-300 sm:max-w-xs ${
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
