import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { useSiteEffects } from "@/hooks/use-site-effects";

type Member = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo: string | null;
  email: string;
};

const MEMBERS: Member[] = [
  { name: "Aarnavi Boppana", initials: "AB", role: "Social Media, Project Management, Portfolio", bio: "Hi, I'm Aarnavi! I work on our social media, project management, and portfolio. My main jobs are to keep us organized on Notion and run the team's Instagram account. I also work on documentation throughout the season for our portfolio and social media. I love spending time with everyone on the team, whether it be during practices or competition!", photo: "/img/aarnavi.jpg", email: "aboppana202@gmail.com" },
  { name: "Avani Poondota", initials: "AP", role: "Programming, Social Media, Project Management, Script", bio: "Hey! I'm Avani, and I work on programming, social media, project management, and script. This is my 5th year doing robotics, and what I love about it is the creativity and competition. I also love connecting and spending time with the team and making fun memories!", photo: "/img/avani.jpg", email: "avani.poondota@gmail.com" },
  { name: "Virja Mehta", initials: "VM", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Hey, I'm Virja! On the team, my role is to build, fix, and maintain the robot throughout the season and between matches, along with documenting our progress in the team portfolio. I love robotics because it lets me show my interests in a competitive context, and besides the hard work, I enjoy spending time with my team and all the fun memories we make along the way.", photo: "/img/virja.jpg", email: "virjamehta6@gmail.com" },
  { name: "Amir Islamkulov", initials: "AI", role: "Mechanical, CAD, Design", bio: "Amir works on the mechanical sub-team and handles a big share of the CAD and design work. Amir focuses on turning ideas into mechanisms we can actually build. More about Amir coming soon.", photo: null, email: "amirislamkulov16@gmail.com" },
  { name: "Hrithik Ajith", initials: "HA", role: "Project Management, Programming, Portfolio", bio: "Hrithik works on project management, programming, and the portfolio. Hrithik keeps the programming sub-team organized while writing code. More about Hrithik coming soon.", photo: null, email: "hrithik.ajith@gmail.com" },
  { name: "Ishaan Pemmaraju", initials: "IP", role: "Management, STEM Connections, Script, Portfolio", bio: "Ishaan handles team management, builds STEM connections in the community, and works on script and the portfolio. Ishaan helps run team operations and outside partnerships. More about Ishaan coming soon.", photo: null, email: "ishaan.pemmaraju.9@gmail.com" },
  { name: "Peter Napoleonak", initials: "PN", role: "Mood Booster, Helper", bio: "Peter keeps team morale up and helps out wherever an extra pair of hands is needed. The mood booster role is a real one on this team. More about Peter coming soon.", photo: null, email: "peter.katnap@gmail.com" },
  { name: "Saisri Kondapaneni", initials: "SK", role: "Script, CAD, Mechanical", bio: "Saisri works on script, CAD, and the mechanical sub-team. Saisri is comfortable moving between design and build tasks during the season. More about Saisri coming soon.", photo: null, email: "hypersai123@gmail.com" },
  { name: "Sanya Patel", initials: "SP", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Sanya keeps the bot working between matches, helps with the portfolio, and works on the mechanical sub-team. Bot maintenance is one of the most important roles during a competition. More about Sanya coming soon.", photo: null, email: "sanyap0206@gmail.com" },
  { name: "Yuvika Kandel", initials: "YK", role: "Programming, Project Management", bio: "Yuvika works on programming and project management. Yuvika helps maintain the autonomous routines and keeps the programming tasks tracked. More about Yuvika coming soon.", photo: null, email: "yuvika.kandel@gmail.com" },
];

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/40">
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-primary/30 to-card">
        {m.photo ? (
          <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-[center_top]" draggable={false} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl font-black text-primary/80">{m.initials}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold text-white">{m.name}</h3>
        <p className="mt-0.5 text-sm font-semibold uppercase tracking-wide text-primary">{m.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{m.bio}</p>
        <a
          href={`mailto:${m.email}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-xs font-medium text-foreground/60 hover:text-primary"
        >
          <Mail className="h-3.5 w-3.5" /> {m.email}
        </a>
      </div>
    </div>
  );
}

function TeamStack({ members }: { members: Member[] }) {
  const [index, setIndex] = useState(0);
  const n = members.length;
  const advance = () => setIndex((i) => (i + 1) % n);
  const back = () => setIndex((i) => (i - 1 + n) % n);

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto h-[480px] w-[min(92vw,360px)]">
        {members.map((m, i) => {
          const pos = (i - index + n) % n; // 0 = top of the stack
          if (pos > 3) return null;
          const isTop = pos === 0;
          return (
            <div
              key={m.name}
              onClick={() => isTop && advance()}
              className={`absolute inset-0 transition-all duration-500 ease-out ${isTop ? "cursor-pointer" : "pointer-events-none"}`}
              style={{
                transform: `translateY(${pos * 16}px) scale(${1 - pos * 0.05})`,
                zIndex: n - pos,
                opacity: pos > 2 ? 0 : 1,
                filter: isTop ? "none" : "brightness(0.7)",
              }}
            >
              <MemberCard m={m} />
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex items-center gap-4">
        <button onClick={back} className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card text-foreground/80 transition-transform hover:scale-105 active:scale-95" aria-label="Previous">
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>
        <span className="min-w-[60px] text-center font-mono text-sm text-foreground/70">
          {index + 1} / {n}
        </span>
        <button onClick={advance} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-b from-primary/90 to-primary text-primary-foreground shadow-[0_8px_20px_rgba(255,31,143,0.3)] transition-transform hover:scale-105 active:scale-95" aria-label="Next">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-xs text-foreground/50">Click a card or use the arrows to flip through the team.</p>
    </div>
  );
}

export function Team() {
  useSiteEffects();
  return (
    <>
      <Navbar active="/team.html" />
      <section className="container" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow">Our roster</span>
          <h1 className="mega-text-mid">The <span className="accent">Team.</span></h1>
          <p className="section-sub">Ten students who build, code, and run the Zebros.</p>
        </div>
        <div className="mt-8">
          <TeamStack members={MEMBERS} />
        </div>
      </section>
      <Footer />
    </>
  );
}
