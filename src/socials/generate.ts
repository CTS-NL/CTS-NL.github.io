/**
 * Build-time poster generator. Writes social images to `public/og/` so they
 * ship as part of the static site and can be referenced from og:image tags.
 *
 * Run automatically via the Astro integration in `astro.config.mjs`, but the
 * file is also importable as a regular module if you want to run it ad-hoc.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

import { renderPosterSvg, type PosterInput } from "./poster.ts";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/og");

async function writePoster(name: string, input: PosterInput): Promise<void> {
  const svg = renderPosterSvg(input);
  const pngPath = path.join(OUT_DIR, `${name}.png`);
  const svgPath = path.join(OUT_DIR, `${name}.svg`);
  mkdirSync(OUT_DIR, { recursive: true });
  // Keep the SVG too so you can grab and tweak by hand if needed.
  writeFileSync(svgPath, svg, "utf8");
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath);
}

export async function generateAllPosters(): Promise<void> {
  await writePoster("every-thursday", {
    date: "Every Thursday",
    time: "7pm",
  });
}

// Allow running with `node src/socials/generate.ts` (or via `tsx`) for ad-hoc use.
const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("generate.ts") ||
  process.argv[1]?.endsWith("generate.js");

if (isMain) {
  generateAllPosters()
    .then(() => {
      console.log("✓ Generated posters in public/og/");
    })
    .catch((err) => {
      console.error("Poster generation failed:", err);
      process.exit(1);
    });
}
