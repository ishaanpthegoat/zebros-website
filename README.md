# Team 30415 Zebros

Website for FTC Team 30415 (the Zebros), a youth robotics team based in Cary, North Carolina.

Live at **https://zebrosrobotics.com**

## Stack

The **homepage** is a [Vite](https://vitejs.dev) + React + TypeScript + [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) app, so modern React/shadcn components can be dropped in. The remaining pages are static HTML served from `public/` and share the global stylesheets.

```
index.html              Vite entry (links the shared global CSS)
src/
  main.tsx              mounts the homepage
  pages/Home.tsx        homepage: navbar + <PixelHero/> + ported sections
  components/ui/        shadcn components (e.g. pixel-perfect-hero.tsx)
  lib/utils.ts          cn() helper
  hooks/                React reimplementations of the legacy scroll effects
  index.css            Tailwind layers + shadcn design tokens (Zebros brand)
public/
  CNAME                 custom domain (zebrosrobotics.com)
  css/ js/ img/         shared assets
  about/team/coaches/past-seasons/blog/sponsors/outreach .html   static pages
```

## Develop

```bash
npm install
npm run dev      # Vite dev server with HMR
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Adding a UI component

Drop a shadcn-style `.tsx` into `src/components/ui/`, install its npm deps, then use it
from `src/pages/Home.tsx` (or another page). See the `install-shadcn-component` skill and
`src/components/ui/pixel-perfect-hero.tsx` for a worked example.

## Deploy

The site is hosted on **Vercel** at the custom domain `zebrosrobotics.com`, connected to this
GitHub repo. Pushing to `main` triggers an automatic Vercel build. `vercel.json` pins the build
(`npm run build` → `dist/`) so the Vite app is compiled rather than served as raw source.

(`public/CNAME` is a leftover from an earlier GitHub Pages setup and is not used by Vercel.)

## Pages

- `/`: Home (React)
- `about.html`: Team story, values, and timeline
- `team.html`: Roster (clickable profiles)
- `coaches.html`: Coach profiles
- `past-seasons.html`: 2025 rookie season stats for both 30415 and 30416
- `blog.html`: Weekly team updates
- `sponsors.html`: Sponsorship tiers (Silver / Gold / Title Sponsor)

## Contact

- Address: 1408 Boulderstone Way, Cary, NC 27519
- Phone: (919) 650-6333
- Email: infocary@zebrarobotics.com
