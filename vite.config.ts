import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Custom domain (CNAME) serves from the site root, so base is "/".
// Multi-page app: the home (/) and the blog (/blog.html) are both React entries.
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        blog: fileURLToPath(new URL("./blog.html", import.meta.url)),
        team: fileURLToPath(new URL("./team.html", import.meta.url)),
        about: fileURLToPath(new URL("./about.html", import.meta.url)),
        coaches: fileURLToPath(new URL("./coaches.html", import.meta.url)),
        outreach: fileURLToPath(new URL("./outreach.html", import.meta.url)),
        pastSeasons: fileURLToPath(new URL("./past-seasons.html", import.meta.url)),
        sponsors: fileURLToPath(new URL("./sponsors.html", import.meta.url)),
      },
    },
  },
});
