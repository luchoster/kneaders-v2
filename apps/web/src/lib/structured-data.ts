/* schema.org JSON-LD builders. Everything is derived from Site settings → Business info,
   so the data AI agents and search engines read stays in sync with the Studio. */
import type { BusinessInfo, MenuCategory, OpeningHours, PortableTextBlock, PostDetail, SiteSettings } from "@kneaders/content";
import { mediaSrc } from "./media";

type Node = Record<string, unknown>;

const origin = (business: BusinessInfo) => business.url.replace(/\/+$/, "");
const orgId = (business: BusinessInfo) => `${origin(business)}/#organization`;

/** Drops undefined / empty values so the emitted JSON stays tidy. */
function clean<T extends Node>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(([, v]) => v != null && v !== "" && !(Array.isArray(v) && v.length === 0)),
  ) as T;
}

const plainText = (blocks: PortableTextBlock[] | null | undefined) =>
  blocks?.map((b) => b.children.map((c) => c.text).join("")).join("\n\n") || undefined;

const hoursSpec = (hours: OpeningHours[] | undefined) =>
  hours?.map(({ days, opens, closes }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days.map((d) => `https://schema.org/${d}`),
    opens,
    closes,
  }));

/** Site-wide graph: the WebSite, the Bakery brand, and one Bakery node per café. */
export function siteJsonLd(settings: SiteSettings): Node | null {
  const business = settings.business;
  if (!business?.url) return null;
  const url = origin(business);
  const logo = mediaSrc(business.logo, 512);

  const organization = clean({
    "@type": "Bakery",
    "@id": orgId(business),
    name: settings.title,
    description: settings.description,
    url,
    logo,
    image: logo,
    email: business.email,
    telephone: business.phone,
    priceRange: business.priceRange,
    servesCuisine: business.cuisines,
    foundingDate: business.foundingYear?.toString(),
    sameAs: business.sameAs,
    openingHoursSpecification: hoursSpec(business.hours),
    department: business.locations?.map((l) => ({ "@id": `${url}/#location-${l._key}` })),
  });

  const locations = (business.locations ?? []).map((l) =>
    clean({
      "@type": "Bakery",
      "@id": `${url}/#location-${l._key}`,
      name: l.name,
      url,
      image: logo,
      telephone: l.phone ?? business.phone,
      priceRange: business.priceRange,
      servesCuisine: business.cuisines,
      parentOrganization: { "@id": orgId(business) },
      address: {
        "@type": "PostalAddress",
        streetAddress: l.street,
        addressLocality: l.city,
        addressRegion: l.region,
        postalCode: l.postalCode,
        addressCountry: l.country ?? "US",
      },
      geo:
        l.latitude != null && l.longitude != null
          ? { "@type": "GeoCoordinates", latitude: l.latitude, longitude: l.longitude }
          : undefined,
      hasMap: l.mapUrl,
      openingHoursSpecification: hoursSpec(l.hours?.length ? l.hours : business.hours),
    }),
  );

  const website = clean({
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: settings.title,
    description: settings.description,
    publisher: { "@id": orgId(business) },
  });

  return { "@context": "https://schema.org", "@graph": [website, organization, ...locations] };
}

export function articleJsonLd(post: PostDetail, settings: SiteSettings): Node | null {
  const business = settings.business;
  if (!business?.url) return null;
  const url = `${origin(business)}/journal/${post.slug}`;
  return clean({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    image: mediaSrc(post.image),
    datePublished: post.publishedAt,
    articleSection: post.tag,
    author: clean({ "@type": "Person", name: post.author, jobTitle: post.authorRole }),
    publisher: { "@id": orgId(business) },
  });
}

/** The menu board as a schema.org Menu, linked to the business. */
export function menuJsonLd(categories: MenuCategory[], path: string, settings: SiteSettings): Node | null {
  const business = settings.business;
  if (!business?.url || !categories.length) return null;
  const url = `${origin(business)}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}#menu`,
    name: `${settings.title} menu`,
    url,
    inLanguage: "en-US",
    provider: { "@id": orgId(business) },
    hasMenuSection: categories.map((c) =>
      clean({
        "@type": "MenuSection",
        name: c.title,
        description: plainText(c.description) ?? c.subtitle ?? undefined,
        hasMenuItem: c.items.map((item) =>
          clean({
            "@type": "MenuItem",
            name: item.name,
            description: plainText(item.description),
            image: mediaSrc(item.image, 800),
            offers:
              item.price != null
                ? { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "USD" }
                : undefined,
            nutrition:
              item.calories != null
                ? { "@type": "NutritionInformation", calories: `${item.calories} calories` }
                : undefined,
          }),
        ),
      }),
    ),
  };
}
