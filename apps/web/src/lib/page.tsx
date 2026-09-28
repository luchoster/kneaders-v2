import type { Page } from "@kneaders/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/sections";
import { SiteShell } from "@/components/layout/site-shell";
import { getHomePage, getPage } from "@/lib/sanity/fetch";

/** The `homePage` singleton renders at `/`; every other page is a `page` document. */
const loadPage = (slug: string): Promise<Page | null> => (slug === "home" ? getHomePage() : getPage(slug));

/** Shared renderer for every page-builder route. */
export async function renderPage(slug: string) {
  const page = await loadPage(slug);
  if (!page) notFound();
  return (
    <SiteShell active={page.navKey}>
      <PageBuilder sections={page.sections} />
    </SiteShell>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await loadPage(slug);
  if (!page) return {};
  return {
    title: slug === "home" ? { absolute: page.seo?.title ?? page.title } : (page.seo?.title ?? page.title),
    description: page.seo?.description,
  };
}
