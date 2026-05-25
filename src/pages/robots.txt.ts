import type { APIContext } from "astro";

export async function GET({ site }: APIContext) {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", site).toString()}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
