import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { DISCORD_INVITE_LINK } from "../lib/links";

export async function GET({ site }: APIContext) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  function postUrl(id: string) {
    const m = id.match(/^(\d{4})\/(\d{2})\/(\d{2})-(.+)$/);
    if (!m) return `/news/${id}/`;
    const [, y, mo, d, slug] = m;
    return `/news/${y}/${mo}/${d}/${slug}/`;
  }

  const pages = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about/" },
    { title: "News", url: "/news/" },
    { title: "Code of Conduct", url: "/conduct/" },
    { title: "Contact", url: "/contact/" },
  ];

  const body = `# CTS-NL

> A community for people interested in software and technology in Newfoundland and Labrador.

CTS-NL meets every Thursday from 7 pm at Jumping Bean Coffee on Elizabeth Avenue in St. John's, NL. Check Discord (${DISCORD_INVITE_LINK}) before heading over in case the cafe closes early or the location changes. Between meetups, the group keeps in touch on Discord.

For other tech events and jobs in the St. John's area, see https://siliconharbour.dev.

## Pages

${pages.map((p) => `- [${p.title}](${new URL(p.url, site).toString()})`).join("\n")}

## Recent posts

${posts
  .slice(0, 20)
  .map((p) => `- [${p.data.title}](${new URL(postUrl(p.id), site).toString()})`)
  .join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
