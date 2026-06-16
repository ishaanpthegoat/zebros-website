import { useState } from "react";
import { Mail, X } from "lucide-react";
import { Layout } from "@/components/site/layout";
import DisplayCards from "@/components/ui/display-cards";

type Member = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo: string | null;
  email: string;
};

const MEMBERS: Member[] = [
  { name: "Aarnavi Boppana", initials: "AB", role: "Social Media, Project Management", bio: "Hi, I'm Aarnavi! I work on our social media, project management, and portfolio. My main jobs are to keep us organized on Notion and run the team's Instagram account. I also work on documentation throughout the season for our portfolio and social media. I love spending time with everyone on the team, whether it be during practices or competition!", photo: "/img/aarnavi.jpg", email: "aboppana202@gmail.com" },
  { name: "Avani Poondota", initials: "AP", role: "Programming, Social Media, Script", bio: "Hey! I'm Avani, and I work on programming, social media, project management, and script. This is my 5th year doing robotics, and what I love about it is the creativity and competition. I also love connecting and spending time with the team and making fun memories!", photo: "/img/avani.jpg", email: "avani.poondota@gmail.com" },
  { name: "Virja Mehta", initials: "VM", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Hey, I'm Virja! On the team, my role is to build, fix, and maintain the robot throughout the season and between matches, along with documenting our progress in the team portfolio. I love robotics because it lets me show my interests in a competitive context, and besides the hard work, I enjoy spending time with my team and all the fun memories we make along the way.", photo: "/img/virja.jpg", email: "virjamehta6@gmail.com" },
  { name: "Amir Islamkulov", initials: "AI", role: "Mechanical, CAD, Design", bio: "Amir works on the mechanical sub-team and handles a big share of the CAD and design work. Amir focuses on turning ideas into mechanisms we can actually build. More about Amir coming soon.", photo: null, email: "amirislamkulov16@gmail.com" },
  { name: "Hrithik Ajith", initials: "HA", role: "Project Management, Programming", bio: "Hrithik works on project management, programming, and the portfolio. Hrithik keeps the programming sub-team organized while writing code. More about Hrithik coming soon.", photo: null, email: "hrithik.ajith@gmail.com" },
  { name: "Ishaan Pemmaraju", initials: "IP", role: "Management, STEM Connections, Script", bio: "Ishaan handles team management, builds STEM connections in the community, and works on script and the portfolio. Ishaan helps run team operations and outside partnerships. More about Ishaan coming soon.", photo: null, email: "ishaan.pemmaraju.9@gmail.com" },
  { name: "Peter Napoleonak", initials: "PN", role: "Mood Booster, Helper", bio: "Peter keeps team morale up and helps out wherever an extra pair of hands is needed. The mood booster role is a real one on this team. More about Peter coming soon.", photo: null, email: "peter.katnap@gmail.com" },
  { name: "Saisri Kondapaneni", initials: "SK", role: "Script, CAD, Mechanical", bio: "Saisri works on script, CAD, and the mechanical sub-team. Saisri is comfortable moving between design and build tasks during the season. More about Saisri coming soon.", photo: null, email: "hypersai123@gmail.com" },
  { name: "Sanya Patel", initials: "SP", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Sanya keeps the bot working between matches, helps with the portfolio, and works on the mechanical sub-team. Bot maintenance is one of the most important roles during a competition. More about Sanya coming soon.", photo: null, email: "sanyap0206@gmail.com" },
  { name: "Yuvika Kandel", initials: "YK", role: "Programming, Project Management", bio: "Yuvika works on programming and project management. Yuvika helps maintain the autonomous routines and keeps the programming tasks tracked. More about Yuvika coming soon.", photo: null, email: "yuvika.kandel@gmail.com" },
];

// Literal class strings (Tailwind cannot detect dynamically-built class names).
const POS = [
  "translate-x-[0px] translate-y-[0px]",
  "translate-x-[22px] translate-y-[13px]",
  "translate-x-[44px] translate-y-[26px]",
  "translate-x-[66px] translate-y-[39px]",
  "translate-x-[88px] translate-y-[52px]",
  "translate-x-[110px] translate-y-[65px]",
  "translate-x-[132px] translate-y-[78px]",
  "translate-x-[154px] translate-y-[91px]",
  "translate-x-[176px] translate-y-[104px]",
  "translate-x-[198px] translate-y-[117px]",
];
const STACK_FX =
  "before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-background/60 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0 grayscale-[100%] hover:grayscale-0";

function cardClassName(i: number, total: number) {
  const isLast = i === total - 1;
  return `[grid-area:stack] ${POS[i] ?? POS[POS.length - 1]} hover:-translate-y-2 hover:z-[60] ${isLast ? "" : STACK_FX}`;
}

export function Team() {
  const [selected, setSelected] = useState<Member | null>(null);

  const cards = MEMBERS.map((m, i) => ({
    icon: (
      <span className="grid h-5 w-5 place-items-center text-[10px] font-bold text-pink-100">{m.initials}</span>
    ),
    title: m.name,
    description: m.role,
    date: "Tap for bio",
    className: cardClassName(i, MEMBERS.length),
    onClick: () => setSelected(m),
  }));

  return (
    <Layout active="/team.html">
      <section className="container" style={{ paddingTop: "6rem", paddingBottom: "5rem" }}>
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow">Our roster</span>
          <h1 className="mega-text-mid">The <span className="accent">Team.</span></h1>
          <p className="section-sub">Ten students who build, code, and run the Zebros. Tap a card to read a bio.</p>
        </div>

        <div className="mt-10 flex min-h-[360px] items-center justify-center overflow-hidden">
          <div className="origin-center scale-[0.62] sm:scale-90 md:scale-100">
            <DisplayCards cards={cards} />
          </div>
        </div>
      </section>

      {/* Bio modal */}
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
            <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-primary/30 to-card">
              {selected.photo ? (
                <img src={selected.photo} alt={selected.name} className="h-full w-full object-cover object-[center_top]" />
              ) : (
                <div className="grid h-full w-full place-items-center text-7xl font-black text-primary/80">{selected.initials}</div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-white">{selected.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary">{selected.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{selected.bio}</p>
              <a href={`mailto:${selected.email}`} className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> {selected.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
