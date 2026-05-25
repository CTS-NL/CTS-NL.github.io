const AUTHORS: Record<string, string> = {
  mitmaro: "Tim Oram",
  jackharrhy: "Jack Harrhy",
};

export function authorName(slug: string | undefined | null): string | undefined {
  if (!slug) return undefined;
  return AUTHORS[slug] ?? slug;
}
