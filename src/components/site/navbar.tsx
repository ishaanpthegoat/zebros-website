import {
  Menu as MenuIcon,
  X,
  Home,
  Info,
  Users,
  GraduationCap,
  Trophy,
  Newspaper,
  Handshake,
} from "lucide-react";
import { MenuContainer, MenuItem } from "@/components/ui/fluid-menu";

const LINKS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about.html", label: "About", Icon: Info },
  { href: "/team.html", label: "Team", Icon: Users },
  { href: "/coaches.html", label: "Coaches", Icon: GraduationCap },
  { href: "/past-seasons.html", label: "Past Seasons", Icon: Trophy },
  { href: "/blog.html", label: "Blog", Icon: Newspaper },
  { href: "/sponsors.html", label: "Sponsors", Icon: Handshake },
];

export function Navbar({ active = "/" }: { active?: string }) {
  return (
    <>
      {/* Fluid circular menu, top-left */}
      <div className="fixed top-4 left-4 z-[120]">
        <MenuContainer>
          <MenuItem
            icon={
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={24} strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={24} strokeWidth={1.5} />
                </div>
              </div>
            }
          />
          {LINKS.map((l) => (
            <MenuItem
              key={l.href}
              isActive={active === l.href}
              onClick={() => {
                window.location.href = l.href;
              }}
              icon={
                <span className="relative flex items-center justify-center">
                  <l.Icon size={22} strokeWidth={active === l.href ? 2.6 : 1.75} className={active === l.href ? "text-primary" : ""} />
                  <span className="pointer-events-none absolute left-[calc(100%+26px)] top-1/2 z-[200] -translate-y-1/2 -translate-x-2 whitespace-nowrap rounded-lg border border-border/60 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                    {l.label}
                    {active === l.href && <span className="ml-1.5 text-primary">(here)</span>}
                  </span>
                </span>
              }
            />
          ))}
        </MenuContainer>
      </div>

      {/* Centered logo, top-middle */}
      <a
        href="/"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2 group"
        aria-label="Team 30415 Zebros, home"
      >
        <img
          src="/img/logo-mark.png"
          alt="Team 30415 Zebros logo"
          className="w-11 h-11 drop-shadow-[0_0_10px_rgba(255,31,143,0.55)] transition-transform duration-300 group-hover:-rotate-12"
        />
        <span className="font-extrabold tracking-tight text-white text-lg">
          Team <span className="text-primary">30415</span>
        </span>
      </a>
    </>
  );
}
