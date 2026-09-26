import { Wrench, Cog, ClipboardList, Users, PenTool, Megaphone, Lightbulb, Trophy, Handshake } from "lucide-react";
import { Layout } from "@/components/site/layout";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useIsMobile } from "@/hooks/use-is-mobile";

const timelineData = [
  {
    id: 1,
    title: "Build Plan",
    date: "Sep 22",
    content: "Locked in the intake and sorting concept — a vertical intake feeding a bucket that splits balls by size — and started planning our alliance-strategy slides for competition.",
    category: "Strategy",
    icon: Lightbulb,
    relatedIds: [2],
    status: "in-progress" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "First Iteration",
    date: "Sep 19",
    content: "Finished the first iteration of the intake and drivetrain — a working mechanical base we can now test, break, and improve before the next build.",
    category: "Build",
    icon: Cog,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 96,
  },
  {
    id: 3,
    title: "Concepts",
    date: "Sep 15",
    content: "Kicked off shooter CAD and intake concepts, including rubber-band wheels and a fold-up design to fit the 18-in start / 24-in deployed rule, while nailing down drive-chain plate spacing.",
    category: "Design",
    icon: PenTool,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 4,
    title: "Outreach",
    date: "Aug 29",
    content: "Reaching out to local organizations to bring STEM and robotics demos to underprivileged kids in our community.",
    category: "Outreach",
    icon: Handshake,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 86,
  },
  {
    id: 5,
    title: "Scrimmage",
    date: "Aug 22",
    content: "Built V2 of the robot and ran our first scrimmage, winning 7-0 against our sister team, 30416. Wanted more endgame scoring out of it, so we're already moving to V3.",
    category: "Competition",
    icon: Trophy,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 6,
    title: "Drivetrain",
    date: "Jun 8",
    content: "Started building the drivetrain and launched this website.",
    category: "Build",
    icon: Wrench,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 72,
  },
  {
    id: 7,
    title: "Prototype",
    date: "Jun 1",
    content: "Split into two squads to test a linear slide intake against a roller bar design.",
    category: "Build",
    icon: Cog,
    relatedIds: [6, 8],
    status: "completed" as const,
    energy: 64,
  },
  {
    id: 8,
    title: "Review",
    date: "May 25",
    content: "Reviewed every event from the 2025 season, including a recurring servo failure we are fixing.",
    category: "Strategy",
    icon: ClipboardList,
    relatedIds: [7, 9],
    status: "completed" as const,
    energy: 56,
  },
  {
    id: 9,
    title: "Rosters",
    date: "May 18",
    content: "Finished the off-season roster reorganization across both 30415 and 30416.",
    category: "Team",
    icon: Users,
    relatedIds: [8, 10],
    status: "completed" as const,
    energy: 48,
  },
  {
    id: 10,
    title: "CAD",
    date: "May 11",
    content: "Trained new members in Onshape so they can design custom mounting plates.",
    category: "Training",
    icon: PenTool,
    relatedIds: [9, 11],
    status: "completed" as const,
    energy: 40,
  },
  {
    id: 11,
    title: "STEM Day",
    date: "May 4",
    content: "Ran a robotics demo booth at the Cary Library STEM day for about 80 kids.",
    category: "Outreach",
    icon: Megaphone,
    relatedIds: [10, 12],
    status: "completed" as const,
    energy: 32,
  },
  {
    id: 12,
    title: "Pit",
    date: "Apr 27",
    content: "Sorted every fastener, labeled the drawers, and organized the pit for build season.",
    category: "Logistics",
    icon: Wrench,
    relatedIds: [11, 13],
    status: "completed" as const,
    energy: 24,
  },
  {
    id: 13,
    title: "Strategy",
    date: "Apr 20",
    content: "First strategy meeting for next season: scoring priorities and robot ideas.",
    category: "Strategy",
    icon: Lightbulb,
    relatedIds: [12],
    status: "completed" as const,
    energy: 16,
  },
];

const centerCard = (
  <div className="rounded-xl border border-primary/20 bg-card/95 backdrop-blur-lg p-4 shadow-2xl shadow-black/60">
    <span className="text-[11px] uppercase tracking-wider text-primary font-semibold">Week of September 22, 2026</span>
    <h3 className="mt-1 text-lg font-bold text-white">First iteration done, intake and sorting locked in</h3>
    <p className="mt-1 text-sm text-white/70">
      Finished our first intake and drivetrain iteration, settled on a vertical intake that sorts balls by size into a bucket, and started planning alliance strategy for competition.
    </p>
    <div className="mt-3 grid grid-cols-2 gap-2">
      <img src="/img/robot/shot-1.png" alt="CAD of the full V2 robot, arm extended" className="w-full h-24 object-cover rounded-lg border border-white/10" loading="lazy" />
      <img src="/img/robot/shot-6.png" alt="CAD of the arm module detached from the chassis" className="w-full h-24 object-cover rounded-lg border border-white/10" loading="lazy" />
    </div>
  </div>
);

export function Blog() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Layout active="/blog.html">
        <section className="container" style={{ paddingTop: "6rem" }}>
          <div className="text-center">
            <span className="eyebrow">Weekly updates</span>
            <h1 className="mega-text-mid">The <span className="accent">Blog.</span></h1>
            <p className="section-sub">Our week by week progress.</p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-lg">{centerCard}</div>

          {/* Vertical, full-width timeline — readable on a phone */}
          <ol className="relative mx-auto mt-8 w-full max-w-lg space-y-4 border-l border-primary/25 pl-5">
            {timelineData.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="relative">
                  <span className="absolute -left-[1.7rem] top-3 grid h-7 w-7 place-items-center rounded-full bg-primary/90 text-white ring-4 ring-background">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="liquid-glass rounded-2xl p-4 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {item.date}
                      </span>
                      <span className="rounded-full border border-border/60 bg-card/60 px-2 py-0.5 text-[10px] font-medium text-foreground/70">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                      {item.content}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </Layout>
    );
  }

  return (
    <Layout active="/blog.html" footer={false}>
      <section className="container" style={{ paddingTop: "5.5rem", textAlign: "center", marginBottom: "-3rem" }}>
        <span className="eyebrow">Weekly updates</span>
        <h1 className="mega-text-mid">The <span className="accent">Blog.</span></h1>
        <p className="section-sub">Our week by week progress.</p>
      </section>

      <RadialOrbitalTimeline timelineData={timelineData} centerContent={centerCard} />
    </Layout>
  );
}
