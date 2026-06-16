import { Wrench, Cog, ClipboardList, Users, PenTool, Megaphone, Lightbulb } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useSiteEffects } from "@/hooks/use-site-effects";

const timelineData = [
  {
    id: 1,
    title: "Drivetrain",
    date: "Jun 8",
    content: "Started building the drivetrain, got Lunespark on board as a sponsor, and launched this website.",
    category: "Build",
    icon: Wrench,
    relatedIds: [2],
    status: "in-progress" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Prototype",
    date: "Jun 1",
    content: "Split into two squads to test a linear slide intake against a roller bar design.",
    category: "Build",
    icon: Cog,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Review",
    date: "May 25",
    content: "Reviewed every event from the 2025 season, including a recurring servo failure we are fixing.",
    category: "Strategy",
    icon: ClipboardList,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Rosters",
    date: "May 18",
    content: "Finished the off-season roster reorganization across both 30415 and 30416.",
    category: "Team",
    icon: Users,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 65,
  },
  {
    id: 5,
    title: "CAD",
    date: "May 11",
    content: "Trained new members in Onshape so they can design custom mounting plates.",
    category: "Training",
    icon: PenTool,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 55,
  },
  {
    id: 6,
    title: "STEM Day",
    date: "May 4",
    content: "Ran a robotics demo booth at the Cary Library STEM day for about 80 kids.",
    category: "Outreach",
    icon: Megaphone,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 45,
  },
  {
    id: 7,
    title: "Pit",
    date: "Apr 27",
    content: "Sorted every fastener, labeled the drawers, and organized the pit for build season.",
    category: "Logistics",
    icon: Wrench,
    relatedIds: [6, 8],
    status: "completed" as const,
    energy: 35,
  },
  {
    id: 8,
    title: "Strategy",
    date: "Apr 20",
    content: "First strategy meeting for next season: scoring priorities and robot ideas.",
    category: "Strategy",
    icon: Lightbulb,
    relatedIds: [7],
    status: "completed" as const,
    energy: 25,
  },
];

export function Blog() {
  useSiteEffects();

  return (
    <>
      <Navbar active="/blog.html" />

      <section className="container" style={{ paddingTop: "5rem" }}>
        <div className="reveal">
          <span className="eyebrow">Weekly updates</span>
          <h1 className="mega-text-mid">The <span className="accent">Blog.</span></h1>
          <p className="section-sub">What the team has been working on each week, in build, programming, strategy, and outreach.</p>
        </div>

        {/* Featured (most recent) */}
        <article className="featured-blog reveal mb-2">
          <div className="featured-blog-content">
            <span className="blog-date">Week of June 8, 2026</span>
            <h3 className="featured-blog-title">Outreach and first drivetrain build</h3>
            <p className="featured-blog-text">Two big areas this week: outreach and sponsorship, and the first real design and drivetrain work. We got our first partner, put up this website, and started building the drivetrain.</p>
            <ul className="featured-highlights">
              <li><strong>Outreach and sponsorship.</strong> We got <span className="accent">Lunespark</span> on board as a partner and are waiting on their call to pick a package. We also planned out our social media, summer STEM events, and team merch, found a good, cheap merch seller, and put up this website.</li>
              <li><strong>Robot development.</strong> The design team planned the brake, intake, slides, and drivetrain, and finished CAD for the drivetrain, intake and slide, and the path from intake to outtake. They also redid the motor and middle section after finding a mounting issue. The build team made two drivetrain sides and did a full robot teardown.</li>
              <li><strong>Team and tooling.</strong> We finished setting member roles, with team info still in progress, and kept setting up our AI and Claude tools for the team.</li>
            </ul>
            <span className="blog-tag">Outreach, CAD, Drivetrain</span>
          </div>
          <div className="featured-blog-visual" aria-hidden="true">
            <div className="visual-orb-2"></div>
            <div className="visual-orb"></div>
          </div>
        </article>

        <figure className="cad-gallery reveal">
          <img src="/img/cad-robot.png" alt="CAD model of the full robot" loading="lazy" />
          <img src="/img/cad-intake.webp" alt="CAD model of the drivetrain and intake" loading="lazy" />
          <figcaption>This week's CAD: the full robot, and the drivetrain and intake assembly.</figcaption>
        </figure>
      </section>

      {/* Orbital timeline of the weeks */}
      <section>
        <div className="container reveal" style={{ textAlign: "center", marginBottom: "-2rem" }}>
          <h2 className="section-title">Week by <span className="accent">week</span></h2>
          <p className="section-sub">Tap a node to read what happened that week.</p>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      <Footer />
    </>
  );
}
