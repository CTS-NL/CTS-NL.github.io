import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * Astro integration that generates social-share posters into `public/og/`
 * and favicons into `public/favicons/` before each build.
 * See src/socials/generate.ts and src/socials/favicon.ts.
 */
function socialPosters() {
  return {
    name: "ctsnl-social-posters",
    hooks: {
      "astro:config:setup": async () => {
        const { generateAllPosters } = await import("./src/socials/generate.ts");
        const { generateFavicons } = await import("./src/socials/favicon.ts");
        await Promise.all([generateAllPosters(), generateFavicons()]);
      },
    },
  };
}

export default defineConfig({
  site: "https://ctsnl.ca",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [sitemap(), socialPosters()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },
});
