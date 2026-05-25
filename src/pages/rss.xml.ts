import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  function postUrl(id: string) {
    const m = id.match(/^(\d{4})\/(\d{2})\/(\d{2})-(.+)$/);
    if (!m) return `/news/${id}/`;
    const [, y, mo, d, slug] = m;
    return `/news/${y}/${mo}/${d}/${slug}/`;
  }

  return rss({
    title: "CTS-NL",
    description: "News from the Computer Technology Society of Newfoundland Labrador.",
    site: context.site!.toString(),
    items: posts.slice(0, 50).map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.teaser ?? "",
      link: postUrl(post.id),
    })),
  });
}
