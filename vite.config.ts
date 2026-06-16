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
      },
    },
  },
});
