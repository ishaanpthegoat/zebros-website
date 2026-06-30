import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/layout";
import { Spotlight } from "@/components/ui/spotlight";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ZebroGooglyLogo } from "@/components/ui/zebro-googly-logo";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { LiquidBackground } from "@/components/site/liquid-background";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function Home() {
  const isMobile = useIsMobile();
  return (
    <Layout active="/" shader={false}>
      {/* Static team-color base — this is all that shows on mobile / reduced-motion */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(255,31,143,0.28),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(122,0,48,0.30),transparent_60%)] bg-background"
      />
      {/* WebGL liquid homescreen (desktop only), painted over the static base */}
      <LiquidBackground />
      {/* ========= HERO: centered logo + spotlight ========= */}
      {/* The liquid homescreen (desktop) / static gradient (mobile) sits behind
          every section, glowing from the logo. */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center isolate px-4">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-1/4" fill="#ff1f8f" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 py-24">
          {/* Logo in the center. The eyes fade in as you scroll and follow the cursor. */}
          <ZebroGooglyLogo className="w-[clamp(220px,40vw,400px)] aspect-square" />

          {/* Headline — animated gooey morph on desktop, static on mobile */}
          <h1 className="sr-only">Team 30415 Zebros</h1>
          {isMobile ? (
            <div className="flex h-[110px] w-full items-center justify-center" aria-hidden="true">
              <span className="text-6xl font-black tracking-tight text-foreground">
                Zebros
              </span>
            </div>
          ) : (
            <div
              className="h-[110px] sm:h-[160px] md:h-[200px] w-full flex items-center justify-center"
              aria-hidden="true"
            >
              <GooeyText
                texts={["Zebros", "Team 30415", "Robotics"]}
                morphTime={1}
                cooldownTime={1.1}
                className="font-black"
                textClassName="tracking-tight"
              />
            </div>
          )}

          <p className="text-xl sm:text-2xl font-light text-foreground/75">
            We do{" "}
            {isMobile ? (
              <span className="font-bold text-primary">robotics</span>
            ) : (
              <AnimatedTextCycle
                words={["robotics", "CAD", "code", "outreach", "competition"]}
                interval={2200}
                className="text-primary"
              />
            )}
          </p>

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

        <article className="featured-blog" data-reveal="right">
          <div className="featured-blog-content">
            <span className="blog-date">Week of June 8, 2026</span>
            <h3 className="featured-blog-title">Outreach and first drivetrain build</h3>
            <p className="featured-blog-text">Two big things this week. We started reaching out for sponsors, and we began building the drivetrain. We also put up this website.</p>
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
        <div className="cta-big" data-reveal="up">
          <h2 className="cta-big-title">Support the <span className="accent">Zebros.</span></h2>
          <p className="cta-big-sub">Help us pay for parts and travel to events. Sponsorship details are coming soon.</p>
          <a href="mailto:infocary@zebrarobotics.com" className="btn btn-primary btn-big">Contact us</a>
        </div>
      </section>

    </Layout>
  );
}
