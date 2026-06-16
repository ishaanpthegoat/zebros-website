import { useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { ZebroGooglyLogo } from "@/components/ui/zebro-googly-logo";
import { SplineSceneBasic } from "@/components/ui/spline-scene-basic";
import { useSiteEffects } from "@/hooks/use-site-effects";

const GITHUB_URL = "https://github.com/ishaanpthegoat/zebros-website";

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
          <img className="logo-svg" src="/img/logo-mark.png" alt="Zebros — Team 30415 logo" width={44} height={44} />
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

      {/* ========= HERO: centered googly logo + spotlight ========= */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-background flex items-center justify-center isolate px-4">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-1/4" fill="#ff1f8f" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 py-24">
          {/* Logo in the center — eyes pop out of the glasses and follow the cursor */}
          <ZebroGooglyLogo className="w-[clamp(220px,40vw,400px)] aspect-square" />

          <h1 className="font-black tracking-tight leading-[0.95] text-[clamp(2.5rem,9vw,6rem)]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">Team 30415 </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#ffb3d6] to-[#ff1f8f]">Zebros.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-light text-foreground/85 max-w-xl px-2 leading-relaxed">
            FTC Team 30415, the Zebros — a student robotics team in Cary, North Carolina.
            We design, build, and program competition robots and mentor the next generation of FIRST.
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
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-card/80 to-card px-7 text-sm font-semibold text-card-foreground ring-1 ring-border/60 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ========= MASSIVE STATS STRIP ========= */}
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
          <span>CARY · NORTH CAROLINA</span><div className="m-dot"></div>
          <span>ZEBRA ROBOTICS</span><div className="m-dot"></div>
          <span>FIRST TECH CHALLENGE</span><div className="m-dot"></div>
          <span>30415 ZEBROS</span><div className="m-dot"></div>
          <span>CARY · NORTH CAROLINA</span><div className="m-dot"></div>
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
            <h3>Prototype, iterate, ship.</h3>
            <p>Quick prototypes, careful iteration. We design in CAD, fabricate in the shop, and test on the field. Each season's robot starts as a sketch and ends as a competition machine.</p>
          </div>
          <div className="pillar reveal reveal-delay-1">
            <div className="pillar-num">02 / COMPETE</div>
            <h3>Six events. Four awards.</h3>
            <p>Across our rookie season we attended six qualifiers between two rosters, took home four judged awards, and stacked 14 match wins. We compete to learn, to win, and to push the robot further every event.</p>
          </div>
          <div className="pillar reveal reveal-delay-2">
            <div className="pillar-num">03 / MENTOR</div>
            <h3>Grow the next class.</h3>
            <p>We mentor FIRST LEGO League teams, run library STEM days, and open our workshop to younger students. FIRST is bigger than any one team.</p>
          </div>
        </div>
      </section>

      {/* ========= INTERACTIVE 3D (Spline) ========= */}
      <section className="container">
        <div className="reveal">
          <SplineSceneBasic />
        </div>
      </section>

      {/* ========= FEATURED BLOG TEASER ========= */}
      <section className="container">
        <div className="flex-between reveal">
          <h2 className="section-title">From the <span className="accent">blog</span></h2>
          <a href="/blog.html" className="btn btn-secondary">All posts →</a>
        </div>

        <article className="featured-blog reveal">
          <div className="featured-blog-content">
            <span className="blog-date">Week of June 8, 2026</span>
            <h3 className="featured-blog-title">Outreach momentum &amp; first drivetrain build</h3>
            <p className="featured-blog-text">A big week on two fronts: public-facing outreach and sponsorship, and the first real robot design and drivetrain work. We landed Lunespark as a partner, stood up this site, and started fabricating the drivetrain.</p>
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

      {/* ========= BIG SPONSOR CTA ========= */}
      <section className="container sponsor-cta-section">
        <div className="cta-big reveal">
          <h2 className="cta-big-title">Sponsor the <span className="accent">Zebros.</span></h2>
          <p className="cta-big-sub">Help us fund parts, travel to qualifiers, and grow STEM in the Triangle. Three sponsorship tiers, real two-way value.</p>
          <a href="/sponsors.html" className="btn btn-primary btn-big">View packages →</a>
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
