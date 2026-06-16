import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { PixelCanvas } from "@/components/ui/pixel-perfect-hero";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ZebroGooglyLogo } from "@/components/ui/zebro-googly-logo";
import { useSiteEffects } from "@/hooks/use-site-effects";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "About", href: "/about.html" },
  { label: "Team", href: "/team.html" },
  { label: "Coaches", href: "/coaches.html" },
  { label: "Past Seasons", href: "/past-seasons.html" },
  { label: "Blog", href: "/blog.html" },
  { label: "Sponsors", href: "/sponsors.html" },
];

export function Home() {
  useSiteEffects();
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      {/* ========= NAVBAR ========= */}
      <nav className="navbar">
        <a href="/" className="nav-brand">
          <img className="logo-svg" src="/img/logo-mark.png" alt="Team 30415 Zebros logo" width={44} height={44} />
          <span>Team <span className="team-num">30415</span></span>
        </a>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
          ☰
        </button>
        <ul className={menuOpen ? "nav-links open" : "nav-links"}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={l.active ? "active" : undefined} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ========= HERO: centered logo + spotlight ========= */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-background flex items-center justify-center isolate px-4">
        {/* Glitter: pixel-canvas shimmer from the pixel-perfect-hero component */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
          <PixelCanvas colors={["#ff1f8f", "#ffb3d6", "#b8b8c4", "#ffffff"]} gap={7} speed={28} />
        </div>
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-1/4" fill="#ff1f8f" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 py-24">
          {/* Logo in the center. The eyes fade in as you scroll and follow the cursor. */}
          <ZebroGooglyLogo className="w-[clamp(220px,40vw,400px)] aspect-square" />

          {/* Gooey morphing headline */}
          <h1 className="sr-only">Team 30415 Zebros</h1>
          <div
            className="h-[110px] sm:h-[160px] md:h-[200px] w-full flex items-center justify-center"
            aria-hidden="true"
          >
            <GooeyText
              texts={["Zebros", "Team 30415", "FIRST", "Robotics"]}
              morphTime={1}
              cooldownTime={1.1}
              className="font-black"
              textClassName="tracking-tight"
            />
          </div>

          <p className="text-base sm:text-lg md:text-xl font-light text-foreground/85 max-w-xl px-2 leading-relaxed">
            We are Team 30415, the Zebros, a high school robotics team in Cary, North Carolina.
            We build and program robots for the FIRST Tech Challenge and help younger students get into STEM.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 mt-2">
            <a
              href="/team.html"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-7 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_24px_rgba(255,31,143,0.25)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Meet the team
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/past-seasons.html"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-card/80 to-card px-7 text-sm font-semibold text-card-foreground ring-1 ring-border/60 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Past seasons
            </a>
          </div>
        </div>
      </section>

      {/* ========= STATS STRIP ========= */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-grid-big">
            <div className="stat-big-item reveal">
              <div className="stat-big-num"><span data-count="10">0</span></div>
              <div className="stat-big-label">Active Members</div>
            </div>
            <div className="stat-big-item reveal reveal-delay-1">
              <div className="stat-big-num"><span data-count="4">0</span></div>
              <div className="stat-big-label">Awards Won</div>
            </div>
            <div className="stat-big-item reveal reveal-delay-2">
              <div className="stat-big-num"><span data-count="6">0</span></div>
              <div className="stat-big-label">Events Attended</div>
            </div>
            <div className="stat-big-item reveal reveal-delay-3">
              <div className="stat-big-num"><span data-count="14">0</span></div>
              <div className="stat-big-label">Match Wins</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= MARQUEE STRIP ========= */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>30415 ZEBROS</span><div className="m-dot"></div>
          <span>CARY, NORTH CAROLINA</span><div className="m-dot"></div>
          <span>ZEBRA ROBOTICS</span><div className="m-dot"></div>
          <span>FIRST TECH CHALLENGE</span><div className="m-dot"></div>
          <span>30415 ZEBROS</span><div className="m-dot"></div>
          <span>CARY, NORTH CAROLINA</span><div className="m-dot"></div>
          <span>ZEBRA ROBOTICS</span><div className="m-dot"></div>
          <span>FIRST TECH CHALLENGE</span><div className="m-dot"></div>
        </div>
      </div>

      {/* ========= THREE PILLARS ========= */}
      <section className="container pillars-section">
        <div className="reveal">
          <span className="eyebrow">What we do</span>
          <h2 className="mega-text-mid">Build.<br />Compete.<br /><span className="accent">Mentor.</span></h2>
        </div>

        <div className="pillar-grid">
          <div className="pillar reveal">
            <div className="pillar-num">01 / BUILD</div>
            <h3>We build the robot.</h3>
            <p>We design parts in CAD, make them in the shop, and test them on the field. The robot changes a lot from the first sketch to the final build each season.</p>
          </div>
          <div className="pillar reveal reveal-delay-1">
            <div className="pillar-num">02 / COMPETE</div>
            <h3>We compete.</h3>
            <p>Last season we went to six qualifiers across two teams, won four awards, and got 14 match wins. We go to learn and to get better each event.</p>
          </div>
          <div className="pillar reveal reveal-delay-2">
            <div className="pillar-num">03 / MENTOR</div>
            <h3>We help others.</h3>
            <p>We help out local FIRST LEGO League teams, run STEM days at the library, and let younger students use our shop.</p>
          </div>
        </div>
      </section>

      {/* ========= FEATURED BLOG TEASER ========= */}
      <section className="container">
        <div className="flex-between reveal">
          <h2 className="section-title">From the <span className="accent">blog</span></h2>
          <a href="/blog.html" className="btn btn-secondary">All posts</a>
        </div>

        <article className="featured-blog reveal">
          <div className="featured-blog-content">
            <span className="blog-date">Week of June 8, 2026</span>
            <h3 className="featured-blog-title">Outreach and first drivetrain build</h3>
            <p className="featured-blog-text">Two big things this week. We started reaching out for sponsors, and we began building the drivetrain. We also got Lunespark on board and put up this website.</p>
            <div>
              <a href="/blog.html" className="btn btn-primary">Read the blog</a>
            </div>
          </div>
          <div className="featured-blog-visual" aria-hidden="true">
            <div className="visual-orb-2"></div>
            <div className="visual-orb"></div>
          </div>
        </article>
      </section>

      {/* ========= SUPPORT CTA ========= */}
      <section className="container sponsor-cta-section">
        <div className="cta-big reveal">
          <h2 className="cta-big-title">Support the <span className="accent">Zebros.</span></h2>
          <p className="cta-big-sub">Help us pay for parts and travel to events. Sponsorship details are coming soon.</p>
          <a href="mailto:infocary@zebrarobotics.com" className="btn btn-primary btn-big">Contact us</a>
        </div>
      </section>

      {/* ========= FOOTER ========= */}
      <footer className="footer">
        <div className="footer-logo">
          <img className="footer-logo-img" src="/img/logo-mark.png" alt="Zebros logo" />
          <span>Zebros, Team 30415</span>
        </div>
        <p>FIRST Tech Challenge, Cary, North Carolina</p>
        <div className="footer-contact">
          <p>1408 Boulderstone Way, Cary, NC 27519</p>
          <p>(919) 650-6333</p>
          <p><a href="mailto:infocary@zebrarobotics.com">infocary@zebrarobotics.com</a></p>
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem", opacity: 0.6 }}>© {year} Team 30415 Zebros</p>
      </footer>
    </>
  );
}
