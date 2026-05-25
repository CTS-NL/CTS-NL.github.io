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

## Meetup posters

The Thursday meetup poster (used as the home page hero image and as the
`og:image` for social-share previews) is generated at build time from
`src/socials/poster.ts`. It uses the brand mark from `public/images/CTSNL
Icon.svg` and produces a 1200×630 PNG at `public/og/every-thursday.png`.

To regenerate manually:

```sh
npm run posters
```
