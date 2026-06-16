import { useState } from "react";
import { X } from "lucide-react";
import { Layout } from "@/components/site/layout";
import DisplayCards from "@/components/ui/display-cards";

type Member = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo: string | null;
};

const MEMBERS: Member[] = [
  { name: "Aarnavi Boppana", initials: "AB", role: "Social Media, Project Management", bio: "Hi, I'm Aarnavi! I work on our social media, project management, and portfolio. My main jobs are to keep us organized on Notion and run the team's Instagram account. I also work on documentation throughout the season for our portfolio and social media. I love spending time with everyone on the team, whether it be during practices or competition!", photo: "/img/aarnavi.jpg" },
  { name: "Avani Poondota", initials: "AP", role: "Programming, Social Media, Script", bio: "Hey! I'm Avani, and I work on programming, social media, project management, and script. This is my 5th year doing robotics, and what I love about it is the creativity and competition. I also love connecting and spending time with the team and making fun memories!", photo: "/img/avani.jpg" },
  { name: "Virja Mehta", initials: "VM", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Hey, I'm Virja! On the team, my role is to build, fix, and maintain the robot throughout the season and between matches, along with documenting our progress in the team portfolio. I love robotics because it lets me show my interests in a competitive context, and besides the hard work, I enjoy spending time with my team and all the fun memories we make along the way.", photo: "/img/virja.jpg" },
  { name: "Amir Islamkulov", initials: "AI", role: "Mechanical, CAD, Design", bio: "Amir works on the mechanical sub-team and handles a big share of the CAD and design work. Amir focuses on turning ideas into mechanisms we can actually build. More about Amir coming soon.", photo: null },
  { name: "Hrithik Ajith", initials: "HA", role: "Project Management, Programming", bio: "Hrithik works on project management, programming, and the portfolio. Hrithik keeps the programming sub-team organized while writing code. More about Hrithik coming soon.", photo: null },
  { name: "Ishaan Pemmaraju", initials: "IP", role: "Management, STEM Connections, Script", bio: "Ishaan handles team management, builds STEM connections in the community, and works on script and the portfolio. Ishaan helps run team operations and outside partnerships. More about Ishaan coming soon.", photo: null },
  { name: "Peter Napoleonak", initials: "PN", role: "Mood Booster, Helper", bio: "Peter keeps team morale up and helps out wherever an extra pair of hands is needed. The mood booster role is a real one on this team. More about Peter coming soon.", photo: null },
  { name: "Saisri Kondapaneni", initials: "SK", role: "Script, CAD, Mechanical", bio: "Saisri works on script, CAD, and the mechanical sub-team. Saisri is comfortable moving between design and build tasks during the season. More about Saisri coming soon.", photo: null },
  { name: "Sanya Patel", initials: "SP", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Sanya keeps the bot working between matches, helps with the portfolio, and works on the mechanical sub-team. Bot maintenance is one of the most important roles during a competition. More about Sanya coming soon.", photo: null },
  { name: "Yuvika Kandel", initials: "YK", role: "Programming, Project Management", bio: "Yuvika works on programming and project management. Yuvika helps maintain the autonomous routines and keeps the programming tasks tracked. More about Yuvika coming soon.", photo: null },
];

// Fully literal class strings — Tailwind's scanner reads source text, so
// these cannot be built at runtime with template interpolation.
// Spread the cards far enough apart that each is easy to read and click. The
// hover state nudges each card up RELATIVE to its own resting spot (a literal
// pixel value, not a fixed keyword offset), so cards never snap or jump.
// Offsets are centered around (0,0) — the first card sits up-and-left of
// center and the last sits down-and-right — so the whole fan (not just its
// top-left corner) lands in the middle of the page.
const POS = [
  "translate-x-[-261px] translate-y-[-148px] hover:translate-x-[-261px] hover:translate-y-[-164px]",
  "translate-x-[-203px] translate-y-[-115px] hover:translate-x-[-203px] hover:translate-y-[-131px]",
  "translate-x-[-145px] translate-y-[-82px] hover:translate-x-[-145px] hover:translate-y-[-98px]",
  "translate-x-[-87px] translate-y-[-49px] hover:translate-x-[-87px] hover:translate-y-[-65px]",
  "translate-x-[-29px] translate-y-[-16px] hover:translate-x-[-29px] hover:translate-y-[-32px]",
  "translate-x-[29px] translate-y-[17px] hover:translate-x-[29px] hover:translate-y-[1px]",
  "translate-x-[87px] translate-y-[50px] hover:translate-x-[87px] hover:translate-y-[34px]",
  "translate-x-[145px] translate-y-[83px] hover:translate-x-[145px] hover:translate-y-[67px]",
  "translate-x-[203px] translate-y-[116px] hover:translate-x-[203px] hover:translate-y-[100px]",
  "translate-x-[261px] translate-y-[149px] hover:translate-x-[261px] hover:translate-y-[133px]",
];

export function Team() {
  const [selected, setSelected] = useState<Member | null>(null);

  const avatar = (m: Member) =>
    m.photo ? (
      <img src={m.photo} alt="" className="h-9 w-9 rounded-full object-cover object-[center_top]" />
    ) : (
      <span className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-pink-50">{m.initials}</span>
    );

  const cards = MEMBERS.map((m, i) => ({
    icon: avatar(m),
    title: m.name,
    description: m.role,
    date: "",
    className: `[grid-area:stack] ${POS[i] ?? POS[POS.length - 1]} transition-transform duration-300 ease-out hover:z-[60]`,
    onClick: () => setSelected(m),
  }));

  return (
    <Layout active="/team.html">
      <section className="container flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <h1 className="reveal mega-text-mid">The <span className="accent">Team.</span></h1>

        <div className="mt-10 flex min-h-[480px] w-full items-center justify-center">
          <div className="origin-center scale-[0.42] sm:scale-[0.72] lg:scale-[1]">
            <DisplayCards cards={cards} />
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white/80 hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative max-h-[60vh] w-full overflow-hidden bg-gradient-to-br from-primary/20 to-card flex items-center justify-center">
              {selected.photo ? (
                <img src={selected.photo} alt={selected.name} className="w-full max-h-[60vh] object-contain" />
              ) : (
                <div className="grid h-64 w-full place-items-center text-7xl font-black text-primary/80">{selected.initials}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-white">{selected.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary">{selected.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{selected.bio}</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
