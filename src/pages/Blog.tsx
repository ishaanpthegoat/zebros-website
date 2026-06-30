import { Wrench, Cog, ClipboardList, Users, PenTool, Megaphone, Lightbulb } from "lucide-react";
import { Layout } from "@/components/site/layout";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useIsMobile } from "@/hooks/use-is-mobile";

const timelineData = [
  {
    id: 1,
    title: "Drivetrain",
    date: "Jun 8",
    content: "Started building the drivetrain and launched this website.",
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

const centerCard = (
  <div className="rounded-xl border border-primary/20 bg-card/95 backdrop-blur-lg p-4 shadow-2xl shadow-black/60">
    <span className="text-[11px] uppercase tracking-wider text-primary font-semibold">Week of June 8, 2026</span>
    <h3 className="mt-1 text-lg font-bold text-white">Outreach and first drivetrain build</h3>
    <p className="mt-1 text-sm text-white/70">
      Started building the drivetrain and put up this website.
    </p>
    <div className="mt-3 grid grid-cols-2 gap-2">
      <img src="/img/cad-robot.png" alt="CAD of the full robot" className="w-full h-24 object-cover rounded-lg border border-white/10" loading="lazy" />
      <img src="/img/cad-intake.webp" alt="CAD of the drivetrain and intake" className="w-full h-24 object-cover rounded-lg border border-white/10" loading="lazy" />
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
