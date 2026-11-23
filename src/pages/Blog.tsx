import { Wrench, Cog, ClipboardList, Users, PenTool, Lightbulb, Trophy, Handshake } from "lucide-react";
import { Layout } from "@/components/site/layout";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { RecentUpdates } from "@/components/site/recent-updates";
import { teamUpdates, latestTeamUpdate } from "@/data/team-updates";
import { useIsMobile } from "@/hooks/use-is-mobile";

const earlierTimelineData = [
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
    relatedIds: [9, 12],
    status: "completed" as const,
    energy: 40,
  },
  {
    id: 12,
    title: "Pit",
    date: "Apr 27",
    content: "Sorted every fastener, labeled the drawers, and organized the pit for build season.",
    category: "Logistics",
    icon: Wrench,
    relatedIds: [10, 13],
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

const fallTimelineData = teamUpdates.map((update, index) => ({
  id: 100 + index,
  title: ["Reliability", "Assembly", "Community", "Ramp", "Transfer", "Shooter", "Robot Code", "Intake Tests"][index],
  date: update.dateLabel,
  content: update.paragraphs.join(" "),
  category: update.category,
  icon: [ClipboardList, Cog, Handshake, Wrench, Cog, Wrench, PenTool, Lightbulb][index],
  relatedIds: index === 0 ? [101, 103] : [99 + index, index < teamUpdates.length - 1 ? 101 + index : 1],
  status: (["in-progress", "in-progress", "in-progress", "completed", "completed", "in-progress", "in-progress", "completed"] as const)[index],
  energy: 100 - index * 5,
  href: `#${update.id}`,
}));

const timelineData = [...fallTimelineData, ...earlierTimelineData.map((item) => ({
  ...item,
  relatedIds: item.id === 1 ? [...item.relatedIds, 107] : item.relatedIds,
}))];

const centerCard = (
  <div className="rounded-xl border border-primary/20 bg-card/95 p-5 shadow-2xl backdrop-blur-lg">
    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Latest documented update · November 10, 2026</span>
    <h3 className="mt-2 text-lg font-bold text-foreground">{latestTeamUpdate.title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{latestTeamUpdate.paragraphs[0]}</p>
    <a href={`#${latestTeamUpdate.id}`} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Read the full update</a>
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

          </section>
        <RecentUpdates />
        <section className="container">
          <h2 className="section-title text-center">Earlier updates</h2>

          {/* Vertical, full-width timeline — readable on a phone */}
          <ol className="relative mx-auto mt-8 w-full max-w-lg space-y-4 border-l border-primary/25 pl-5">
            {earlierTimelineData.map((item) => {
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
    <Layout active="/blog.html" footer={true}>
      <section className="container" style={{ paddingTop: "5.5rem", textAlign: "center", marginBottom: "2rem" }}>
        <span className="eyebrow">Weekly updates</span>
        <h1 className="mega-text-mid">The <span className="accent">Blog.</span></h1>
        <p className="section-sub">Our week by week progress.</p>
      </section>

      <h2 className="section-title text-center">The season, connected</h2>
      <RadialOrbitalTimeline timelineData={timelineData} centerContent={centerCard} />
      <RecentUpdates />
    </Layout>
  );
}
