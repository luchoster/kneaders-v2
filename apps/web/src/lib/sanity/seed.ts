/* Resolves the bundled seed documents into the same shapes the GROQ queries return.
   Used whenever NEXT_PUBLIC_SANITY_PROJECT_ID is not set. */
import {
  seed,
  type MenuCategory,
  type Page,
  type PostCard,
  type PostDetail,
  type PostDocument,
  type KeyedSection,
  type SiteSettings,
} from "@kneaders/content";

const byDateDesc = (a: PostDocument, b: PostDocument) => b.publishedAt.localeCompare(a.publishedAt);

function toCard({ body: _body, slug, _type, ...rest }: PostDocument): PostCard {
  return { ...rest, slug: slug.current };
}

const sortedPosts = () => [...seed.posts].sort(byDateDesc);

function categories(): MenuCategory[] {
  return [...seed.menuCategories]
    .sort((a, b) => a.orderRank - b.orderRank)
    .map(({ _type, slug, orderRank: _o, description, items, ...rest }) => ({
      ...rest,
      slug: slug.current,
      description: description ? seed.portableText(slug.current, [["normal", description]]) : null,
      items: items.map((it) => ({
        ...it,
        description: seed.portableText(it._key, [["normal", it.description]]),
      })),
    }));
}

function resolveSection(section: KeyedSection): KeyedSection {
  switch (section._type) {
    case "journalStrip":
      return { ...section, posts: sortedPosts().slice(0, 12).map(toCard) };
    case "postGrid":
      return { ...section, posts: sortedPosts().map(toCard) };
    case "featuredPost": {
      const first = sortedPosts()[0];
      return { ...section, post: first ? toCard(first) : null };
    }
    case "menuBoard":
      return { ...section, categories: categories() };
    default:
      return section;
  }
}

export function seedPage(slug: string): Page | null {
  const doc = seed.pages.find((p) => p.slug.current === slug);
  if (!doc) return null;
  const { _type, slug: s, sections, ...rest } = doc;
  return { ...rest, slug: s.current, sections: sections.map(resolveSection) };
}

export function seedHomePage(): Page {
  const { _type, sections, ...rest } = seed.homePage;
  return { ...rest, slug: "home", navKey: "home", sections: sections.map(resolveSection) };
}

export const seedPageSlugs = () => seed.pages.map((p) => p.slug.current);

export const seedSettings = (): SiteSettings => seed.siteSettings;

export function seedPost(slug: string): PostDetail | null {
  const doc = seed.posts.find((p) => p.slug.current === slug);
  if (!doc) return null;
  return {
    ...toCard(doc),
    body: doc.body,
    related: sortedPosts()
      .filter((p) => p.slug.current !== slug)
      .slice(0, 3)
      .map(toCard),
  };
}

export const seedPostSlugs = () => seed.posts.map((p) => p.slug.current);
