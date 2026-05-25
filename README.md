# CTS-NL Website

Source for [ctsnl.ca](https://ctsnl.ca), the Computer Technology Society of
Newfoundland Labrador. Built with [Astro](https://astro.build) and Tailwind v4.

## Local development

```sh
npm install
npm run dev
```

The dev server runs at <http://localhost:4321>.

## Build

```sh
npm run build
npm run preview
```

Static output lands in `dist/`. GitHub Actions deploys `master` to GitHub Pages
on every push (see `.github/workflows/deploy.yml`).

## Project layout

```
src/
  pages/                — routes (file-based)
    index.astro         — home page
    news/               — news archive & post pages
    about.astro
    conduct.astro
    contact.astro
  layouts/BaseLayout.astro
  components/           — Header, Footer
  content/posts/        — news posts (YYYY/MM/DD-slug.md)
  lib/
    dates.ts            — NL-timezone date formatting
    links.ts            — DISCORD_INVITE_LINK
  socials/              — meetup poster generator (SVG → PNG via sharp)
  styles/global.css     — Tailwind v4 + theme tokens
public/
  og/every-thursday.png — generated meetup poster (used as og:image)
```

## Adding a news post

Drop a new Markdown file under `src/content/posts/YYYY/MM/DD-slug.md` with
frontmatter like:

```yaml
---
title: "My post title"
date: 2026-02-14
author: jackharrhy # optional
teaser: "One-line summary." # optional
image: foo.jpg # optional, must exist in public/images/
categories:
  - news
---
```

Old Jekyll URLs (`/news/YYYY/MM/DD/slug.html`) are preserved via redirect
pages.

## Events

The site doesn't track events. The weekly Thursday meetup is documented
statically on the home page (location, time, "check Discord to confirm"). For
other tech events and jobs around St. John's, the home page links out to
[siliconharbour.dev](https://siliconharbour.dev).

## Meetup posters

The Thursday meetup poster (used as the home page hero image and as the
`og:image` for social-share previews) is generated at build time from
`src/socials/poster.ts`. It uses the brand mark from `public/images/CTSNL
Icon.svg` and produces a 1200×630 PNG at `public/og/every-thursday.png`.

To regenerate manually:

```sh
npm run posters
```

This replaces the old [Socials repo](https://github.com/CTS-NL/Socials) which
used Python + Inkscape SVG templates + `rsvg-convert`. To add date-specific
posters, edit `generateAllPosters()` in `src/socials/generate.ts`.

## Discord

The community lives on Discord: <https://discord.ctsnl.ca>.
