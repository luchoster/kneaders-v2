/**
 * WordPress menu snapshot → Sanity `menuCategory` / `menuItem` documents.
 *
 * Pure: images are left as `{ _wpImage: url }` placeholders, which import.ts
 * swaps for uploaded asset references. Document IDs are derived from WP slugs
 * so re-running the import updates documents in place.
 */
import type { Tone } from "@kneaders/content";
import type { WpMenuSnapshot, WpYoast } from "./types";

export interface ImagePlaceholder {
  _wpImage: string;
}

/** WP category slug → style-guide color (see `categoryTones` in @kneaders/content). */
const TONES: Record<string, Tone> = {
  breakfast: "gold",
  sandwiches: "gold",
  salads: "sage",
  soups: "sage",
  breads: "red",
  "pastries-desserts": "red",
  "coffee-drinks": "blue",
  smoothies: "blue",
  beverages: "blue",
  "kids-meal": "rust",
  catering: "brown",
};

export const categoryId = (slug: string) => `menuCategory-${slug}`;
export const itemId = (slug: string) => `menuItem-${slug}`;

const ENTITIES: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };

/** WordPress returns some names HTML-encoded (e.g. "Pastries &amp; Desserts"). */
export const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .trim();

/** Drop empty strings / undefined so documents only carry fields WordPress actually set. */
function compact<T extends object>(obj: T): Partial<T> | undefined {
  const entries = Object.entries(obj).filter(([, v]) => v !== undefined && v !== "" && v !== null);
  return entries.length ? (Object.fromEntries(entries) as Partial<T>) : undefined;
}

const text = (s: string | undefined) => (s ? decode(s) : undefined);

/** Plain WP copy → Portable Text, one block per paragraph, with stable keys. */
function richText(s: string | undefined, keyPrefix: string) {
  const paragraphs = (s ? decode(s) : "").split(/\n\s*\n|\r?\n/).map((p) => p.trim()).filter(Boolean);
  if (!paragraphs.length) return undefined;
  return paragraphs.map((p, i) => ({
    _type: "block",
    _key: `${keyPrefix}-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${keyPrefix}-${i}-s`, text: p, marks: [] }],
  }));
}
const image = (url: string | undefined): ImagePlaceholder | undefined => (url ? { _wpImage: url } : undefined);
const media = (url: string | undefined, alt: string) =>
  url ? { _type: "media", image: { _type: "image", asset: image(url) }, alt } : undefined;
const seoImage = (url: string | undefined) => (url ? { _type: "image", asset: image(url) } : undefined);
const yoastFlag = (v: string) => (v === "1" ? true : v === "2" ? false : undefined);

function seo(y: WpYoast) {
  const score = Number.parseInt(y.yoast_wpseo_linkdex, 10);
  const fields = compact({
    title: text(y.yoast_wpseo_title),
    metaDescription: text(y.yoast_wpseo_metadesc),
    focusKeyword: text(y.yoast_wpseo_focuskw),
    metaKeywords: text(y.yoast_wpseo_metakeywords),
    ogTitle: text(y.yoast_wpseo_opengraph_title),
    ogDescription: text(y.yoast_wpseo_opengraph_description),
    ogImage: seoImage(y.yoast_wpseo_opengraph_image),
    twitterTitle: text(y.yoast_wpseo_twitter_title),
    twitterDescription: text(y.yoast_wpseo_twitter_description),
    twitterImage: seoImage(y.yoast_wpseo_twitter_image),
    canonical: y.yoast_wpseo_canonical,
    redirect: y.yoast_wpseo_redirect,
    noindex: yoastFlag(y.yoast_wpseo_meta_robots_noindex),
    nofollow: yoastFlag(y.yoast_wpseo_meta_robots_nofollow),
    robotsAdvanced: y.yoast_wpseo_meta_robots_adv,
    seoScore: Number.isNaN(score) ? undefined : score,
  });
  return fields && { _type: "menuSeo", ...fields };
}

export function transform(snapshot: WpMenuSnapshot) {
  const categories = snapshot.categories.map(({ menu_category: term, image_url }) => {
    const title = decode(term.name);
    // Every row in a category carries the same category-level hero.
    const hero = snapshot.items[term.slug]?.[0]?.hero;
    return {
      _id: categoryId(term.slug),
      _type: "menuCategory",
      title,
      slug: { _type: "slug", current: term.slug },
      ...compact({ description: richText(term.description, "desc") }),
      tone: TONES[term.slug] ?? "brown",
      // Same order kneaders.com lists them in; editors drag to reorder afterwards.
      items: (snapshot.items[term.slug] ?? []).map((row) => ({
        _type: "reference",
        _key: row.slug,
        _ref: itemId(row.slug),
      })),
      ...compact({ image: media(image_url, title) }),
      ...(hero && {
        hero: compact({
          title: text(hero.title),
          subtitle: text(hero.sub_title),
          image: media(hero.hero_image, text(hero.title) ?? title),
        }),
      }),
      wpId: term.term_id,
    };
  });

  // An item listed under several categories becomes one document, referenced by each.
  const items = new Map<string, Record<string, unknown>>();
  for (const rows of Object.values(snapshot.items)) {
    for (const row of rows) {
      if (items.has(row.slug)) continue;
      const title = decode(row.title);
      items.set(row.slug, {
        _id: itemId(row.slug),
        _type: "menuItem",
        title,
        slug: { _type: "slug", current: row.slug },
        ...compact({
          description: richText(row.group.menu_item_description, "desc"),
          image: media(row.group.menu_item_mainimage, title),
          orderUrl: row.group.menu_item_url,
          seo: seo(row.SEO),
        }),
      });
    }
  }

  return { categories, items: [...items.values()] };
}

/** Every distinct image URL referenced by the transformed documents. */
export function imageUrls(docs: unknown): string[] {
  const urls = new Set<string>();
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      if ("_wpImage" in v) urls.add((v as ImagePlaceholder)._wpImage);
      else Object.values(v).forEach(walk);
    }
  };
  walk(docs);
  return [...urls];
}

/** Replace `{ _wpImage }` placeholders with asset references. */
export function resolveImages<T>(doc: T, assetIds: Map<string, string>): T {
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      if ("_wpImage" in v) {
        const id = assetIds.get((v as ImagePlaceholder)._wpImage);
        if (!id) throw new Error(`No asset for ${(v as ImagePlaceholder)._wpImage}`);
        return { _type: "reference", _ref: id };
      }
      return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, walk(val)]));
    }
    return v;
  };
  return walk(doc) as T;
}
