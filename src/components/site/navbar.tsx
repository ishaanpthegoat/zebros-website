import { useState } from "react";
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
  const [hovered, setHovered] = useState<number | null>(null);

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
          {LINKS.map((l, i) => (
            <MenuItem
              key={l.href}
              isActive={active === l.href}
              onClick={() => {
                window.location.href = l.href;
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              icon={<l.Icon size={22} strokeWidth={active === l.href ? 2.6 : 1.75} className={active === l.href ? "text-primary" : ""} />}
            />
          ))}
        </MenuContainer>

        {/* Hover label — rendered outside the clipped menu items so it is visible */}
        <div
          className={`pointer-events-none absolute left-[74px] z-[200] -translate-y-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg backdrop-blur transition-all duration-200 ${
            hovered === null ? "-translate-x-2 opacity-0" : "translate-x-0 opacity-100"
          }`}
          style={{ top: hovered === null ? 56 : (hovered + 1) * 48 + 32 }}
        >
          {hovered !== null && (
            <>
              {LINKS[hovered].label}
              {active === LINKS[hovered].href && <span className="ml-1.5 text-primary">(you are here)</span>}
            </>
          )}
        </div>
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
