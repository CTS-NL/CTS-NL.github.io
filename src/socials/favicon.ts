/**
 * Build-time favicon generator. Rasterizes `public/images/CTSNL Icon.svg`
 * down to a few standard sizes and writes them under `public/favicons/`.
 */

import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ICON_PATH = path.resolve(HERE, "../../public/images/CTSNL Icon.svg");
const OUT_DIR = path.resolve(HERE, "../../public/favicons");

const SIZES = [16, 32, 48, 180, 192, 512];

export async function generateFavicons(): Promise<void> {
  mkdirSync(OUT_DIR, { recursive: true });
  const svg = readFileSync(ICON_PATH);

  await Promise.all(
    SIZES.map((size) =>
      sharp(svg, { density: Math.max(72, size * 4) })
        .resize(size, size, { fit: "contain" })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT_DIR, `favicon-${size}.png`)),
    ),
  );
}
