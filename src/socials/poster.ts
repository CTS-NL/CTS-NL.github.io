/**
 * CTS-NL meetup poster generator.
 *
 * Produces an SVG using the same visual lineage as the legacy Socials repo
 * (https://github.com/CTS-NL/Socials) — dark #222 background, brand mark in
 * #F4F4F4, big "Meetup" title, date/time, venue line, ctsnl.ca footer.
 *
 * The original templates were hand-drawn Inkscape SVGs with embedded JPG
 * backgrounds. This is a code-driven version that produces equivalent output
 * without external tooling, sized for Open Graph link previews (1200x630).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export type PosterInput = {
  /** Visible date label, e.g. "Every Thursday" or "May 28th". */
  dateLabel: string;
  /** Visible time label, e.g. "7pm" or "7pm onwards". */
  timeLabel: string;
  /** Venue line, e.g. "Jumping Bean Coffee · Elizabeth Avenue". */
  venue: string;
};

const W = 1200;
const H = 630;

/**
 * Pull the inner `<g>` artwork out of `public/images/CTSNL Icon.svg` so the
 * brand mark stays a single source of truth.
 */
function loadIconArtwork(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const iconPath = path.resolve(here, "../../public/images/CTSNL Icon.svg");
  const src = readFileSync(iconPath, "utf8");
  const match = src.match(/<g[^>]*id="Artboard-2"[^>]*>[\s\S]*?<\/g>/);
  if (!match) {
    throw new Error("Could not find Artboard-2 group in CTSNL Icon.svg");
  }
  return match[0];
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderPosterSvg({ dateLabel, timeLabel, venue }: PosterInput): string {
  const iconArtwork = loadIconArtwork();
  // The icon's artboard is 300x300. Scale & translate it into a 140px badge in
  // the top-left corner of the poster.
  const iconBadge = `<g transform="translate(40, 40) scale(${140 / 300})">${iconArtwork}</g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#2a2a2a"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  ${iconBadge}

  <g font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" fill="#F4F4F4">
    <text x="200" y="108" font-size="28" font-weight="500" fill="#888888" letter-spacing="2">
      CTS-NL · COMPUTER TECHNOLOGY SOCIETY NL
    </text>

    <text x="40" y="290" font-size="140" font-weight="700" letter-spacing="-3">
      Meetup
    </text>

    <text x="40" y="375" font-size="54" font-weight="500">
      ${escapeXml(dateLabel)} <tspan fill="#888888">·</tspan> ${escapeXml(timeLabel)}
    </text>

    <text x="40" y="445" font-size="36" font-weight="400" fill="#b8b8b8" font-style="italic">
      ${escapeXml(venue)}
    </text>

    <text x="40" y="${H - 60}" font-size="26" font-weight="500" fill="#888888">
      Join us on Discord for more details
    </text>
    <text x="40" y="${H - 22}" font-size="30" font-weight="700" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace">
      ctsnl.ca
    </text>
  </g>
</svg>
`;
}
