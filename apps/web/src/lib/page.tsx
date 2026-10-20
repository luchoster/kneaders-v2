import type { Page } from "@kneaders/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/sections";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/ui/json-ld";
import { getHomePage, getPage, getSettings } from "@/lib/sanity/fetch";
import { menuJsonLd } from "@/lib/structured-data";

/** The `homePage` singleton renders at `/`; every other page is a `page` document. */
const loadPage = (slug: string): Promise<Page | null> => (slug === "home" ? getHomePage() : getPage(slug));

/** Shared renderer for every page-builder route. */
export async function renderPage(slug: string) {
  const [page, settings] = await Promise.all([loadPage(slug), getSettings()]);
  // The home page renders only what's in Sanity: a missing document is an empty shell, not a 404.
  if (!page) {
    if (slug === "home") return <SiteShell active="home">{null}</SiteShell>;
    notFound();
  }
  const menuCategories = page.sections.flatMap((s) => (s._type === "menuBoard" ? (s.categories ?? []) : []));
  return (
    <SiteShell active={page.navKey}>
      <JsonLd data={menuJsonLd(menuCategories, slug === "home" ? "/" : `/${slug}`, settings)} />
      <PageBuilder sections={page.sections} />
    </SiteShell>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await loadPage(slug);
  // Without a document the root layout's default title (the site name) applies.
  if (!page) return {};
  return {
    title: slug === "home" ? { absolute: page.seo?.title ?? page.title } : (page.seo?.title ?? page.title),
    description: page.seo?.description,
  };
}
