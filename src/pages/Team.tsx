import { useState } from "react";
import { X } from "lucide-react";
import { Layout } from "@/components/site/layout";
import DisplayCards from "@/components/ui/display-cards";
import { MemberAccordion } from "@/components/site/member-accordion";
import { useIsMobile } from "@/hooks/use-is-mobile";

type Member = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  photo: string | null;
};

const MEMBERS: Member[] = [
  { name: "Aarnavi Boppana", initials: "AB", role: "Social Media, Project Management", bio: "Hi, I'm Aarnavi! I work on our social media, project management, and portfolio. My main jobs are to keep us organized on Notion and run the team's Instagram account. I also work on documentation throughout the season for our portfolio and social media. I love spending time with everyone on the team, whether it be during practices or competition!", photo: "/img/aarnavi.jpg" },
  { name: "Ashik Favio", initials: "AF", role: "Role coming soon", bio: "Ashik is a member of FTC Team 30415, the Zebros. Ashik's role and full bio are coming soon.", photo: null },
  { name: "Avani Poondota", initials: "AP", role: "Programming, Social Media, Script", bio: "Hey! I'm Avani, and I work on programming, social media, project management, and script. This is my 5th year doing robotics, and what I love about it is the creativity and competition. I also love connecting and spending time with the team and making fun memories!", photo: "/img/avani.jpg" },
  { name: "Ishaan Pemmaraju", initials: "IP", role: "Management, STEM Connections, Script", bio: "Ishaan handles team management, builds STEM connections in the community, and works on script and the portfolio. Ishaan helps run team operations and outside partnerships. More about Ishaan coming soon.", photo: null },
  { name: "Prabhas Vennapoosa", initials: "PV", role: "Role coming soon", bio: "Prabhas is a member of FTC Team 30415, the Zebros. Prabhas's role and full bio are coming soon.", photo: null },
  { name: "Saisri Kondapaneni", initials: "SK", role: "Script, CAD, Mechanical", bio: "Saisri works on script, CAD, and the mechanical sub-team. Saisri is comfortable moving between design and build tasks during the season. More about Saisri coming soon.", photo: "/img/saisri.jpg" },
  { name: "Sanya Patel", initials: "SP", role: "Bot Maintenance, Portfolio, Mechanical", bio: "Hi, I'm Sanya! I work on the mechanical team, help maintain our robot between matches, and contribute to our team's portfolio. Keeping the robot in top condition during competitions is one of my main responsibilities, as it helps ensure everything runs smoothly when it's time to compete. I enjoy solving problems, working with my teammates, and helping our team perform at its best. More about me coming soon!", photo: "/img/sanya.png" },
  { name: "Srivatsa Vadlamani", initials: "SV", role: "Role coming soon", bio: "Srivatsa is a member of FTC Team 30415, the Zebros. Srivatsa's role and full bio are coming soon.", photo: null },
  { name: "Yuvika Kandel", initials: "YK", role: "Programming, Project Management", bio: "Hi, I'm Yuvika! I work on the programming team and help around with project management. My main job is to make sure all parts of the robot are coded and work how we want them to, making our drivers' jobs easier. I love robotics and enjoy spending time with my friends during practices, whether it's to work on the code or chat during lunch breaks.", photo: "/img/yuvika.jpg" },
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
  "translate-x-[-232px] translate-y-[-132px] hover:translate-x-[-232px] hover:translate-y-[-148px]",
  "translate-x-[-174px] translate-y-[-99px] hover:translate-x-[-174px] hover:translate-y-[-115px]",
  "translate-x-[-116px] translate-y-[-66px] hover:translate-x-[-116px] hover:translate-y-[-82px]",
  "translate-x-[-58px] translate-y-[-33px] hover:translate-x-[-58px] hover:translate-y-[-49px]",
  "translate-x-[0px] translate-y-[0px] hover:translate-x-[0px] hover:translate-y-[-16px]",
  "translate-x-[58px] translate-y-[33px] hover:translate-x-[58px] hover:translate-y-[17px]",
  "translate-x-[116px] translate-y-[66px] hover:translate-x-[116px] hover:translate-y-[50px]",
  "translate-x-[174px] translate-y-[99px] hover:translate-x-[174px] hover:translate-y-[83px]",
  "translate-x-[232px] translate-y-[132px] hover:translate-x-[232px] hover:translate-y-[116px]",
];

export function Team() {
  const [selected, setSelected] = useState<Member | null>(null);
  const isMobile = useIsMobile();

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
      {isMobile ? (
        <section className="container flex flex-col text-center" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
          <h1 className="mega-text-mid">The <span className="accent">Team.</span></h1>
          <p className="section-sub mb-6">Tap a card to read more.</p>
          <MemberAccordion members={MEMBERS} />
        </section>
      ) : (
        <section className="container flex min-h-[100dvh] flex-col items-center justify-center text-center">
          <h1 className="reveal mega-text-mid">The <span className="accent">Team.</span></h1>

          <div className="mt-10 flex min-h-[480px] w-full items-center justify-center">
            <div className="origin-center scale-[0.42] sm:scale-[0.72] lg:scale-[1]">
              <DisplayCards cards={cards} />
            </div>
          </div>
        </section>
      )}

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
