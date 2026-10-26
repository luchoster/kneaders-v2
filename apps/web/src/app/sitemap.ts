import type { MetadataRoute } from "next";
import { getPageSlugs, getPostSlugs } from "@/lib/sanity/fetch";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([getPageSlugs(), getPostSlugs()]);
  const slugs = [...new Set([...pages.filter((s) => s !== "home"), "journal"])];
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...slugs.map((slug) => ({
      url: absoluteUrl(`/${slug}`),
      changeFrequency: "monthly" as const,
      priority: slug === "menu" ? 0.9 : 0.7,
    })),
    ...posts.map((slug) => ({
      url: absoluteUrl(`/journal/${slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
