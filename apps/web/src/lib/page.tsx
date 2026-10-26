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

const H1_SECTIONS = new Set(["menuHero", "pageHero", "promoCarousel"]);

/** Shared renderer for every page-builder route. */
export async function renderPage(slug: string) {
  const [page, settings] = await Promise.all([loadPage(slug), getSettings()]);
  // The home page renders only what's in Sanity: a missing document is an empty shell, not a 404.
  if (!page) {
    if (slug === "home") return <SiteShell active="home">{null}</SiteShell>;
    notFound();
  }
  const menuCategories = page.sections.flatMap((s) => (s._type === "menuBoard" ? (s.categories ?? []) : []));
  // Sections that render the page <h1>; any other page gets a visually hidden one.
  const hasHeading = page.sections.some((s) => H1_SECTIONS.has(s._type));
  return (
    <SiteShell active={page.navKey}>
      <JsonLd data={menuJsonLd(menuCategories, slug === "home" ? "/" : `/${slug}`, settings)} />
      {!hasHeading && <h1 className="sr-only">{page.title}</h1>}
      <PageBuilder sections={page.sections} />
    </SiteShell>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await loadPage(slug);
  // Without a document the root layout's default title (the site name) applies.
  if (!page) return {};
  const path = slug === "home" ? "/" : `/${slug}`;
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description;
  return {
    title: slug === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // Nested openGraph/twitter replace the layout's, so restate the fields (image is inherited
    // from the layout's file-based default via the explicit entry below).
    openGraph: {
      type: "website",
      siteName: "Kneaders Bakery & Café",
      locale: "en_US",
      url: path,
      title,
      description,
      images: [{ url: "/kneaders-logo.png", alt: "Kneaders Bakery & Café" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/kneaders-logo.png"] },
  };
}
