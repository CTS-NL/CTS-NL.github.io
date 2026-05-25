/**
 * CTS-NL meetup poster generator.
 *
 * Loads the Inkscape-authored SVG template at `templates/meetup-poster.svg`
 * (originally from the Socials repo: https://github.com/CTS-NL/Socials) and
 * substitutes `{{ date }}` and `{{ time }}` placeholders. Edit the SVG in
 * Inkscape; this file just renders it.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export type PosterInput = {
  /** Visible date label, e.g. "Every Thursday" or "May 28th". */
  date: string;
  /** Visible time label, e.g. "7pm" or "7pm onwards". */
  time: string;
};

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.resolve(HERE, "./templates/meetup-poster.svg");

function loadTemplate(): string {
  return readFileSync(TEMPLATE_PATH, "utf8");
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Render the meetup poster SVG with the given date/time substituted in. */
export function renderPosterSvg({ date, time }: PosterInput): string {
  const template = loadTemplate();
  return template
    .replace(/\{\{\s*date\s*\}\}/g, escapeXml(date))
    .replace(/\{\{\s*time\s*\}\}/g, escapeXml(time));
}
