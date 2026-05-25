import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    // Treat bare YYYY-MM-DD (which YAML parses as midnight UTC) as a local NL date,
    // so the rendered date matches the filename rather than rolling back one day.
    date: z
      .union([z.string(), z.date()])
      .transform((v) => {
        const d = typeof v === "string" ? new Date(v) : v;
        // If this is midnight UTC, rebase to noon NL time on the same calendar day
        // to avoid timezone rollover.
        if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0) {
          const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
          return new Date(`${iso}T12:00:00-03:30`);
        }
        return d;
      })
      .pipe(z.date()),
    author: z.string().optional(),
    teaser: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { posts };
