import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about.html" },
  { label: "Team", href: "/team.html" },
  { label: "Coaches", href: "/coaches.html" },
  { label: "Past Seasons", href: "/past-seasons.html" },
  { label: "Blog", href: "/blog.html" },
  { label: "Sponsors", href: "/sponsors.html" },
];

export function Navbar({ active = "/" }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <a href="/" className="nav-brand">
        <img className="logo-svg" src="/img/logo-mark.png" alt="Team 30415 Zebros logo" width={44} height={44} />
        <span>Team <span className="team-num">30415</span></span>
      </a>
      <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
        ☰
      </button>
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={active === l.href ? "active" : undefined} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
