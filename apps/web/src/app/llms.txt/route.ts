import { getPageSlugs, getSettings } from "@/lib/sanity/fetch";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

const label = (slug: string) => slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());

export async function GET() {
  const [settings, slugs] = await Promise.all([getSettings(), getPageSlugs()]);
  const pages = [...new Set([...slugs.filter((s) => s !== "home"), "journal"])];
  const body = [
    `# ${settings.title}`,
    "",
    ...(settings.description ? [`> ${settings.description}`, ""] : []),
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")})`,
    ...pages.map((s) => `- [${label(s)}](${absoluteUrl(`/${s}`)})`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
