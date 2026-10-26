import "server-only";
import type { Page, PostDetail, SiteSettings } from "@kneaders/content";
import { SITE_URL } from "../site";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import {
  HOME_QUERY,
  PAGE_QUERY,
  PAGE_SLUGS_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  SETTINGS_QUERY,
} from "./queries";
import { seedPage, seedPageSlugs, seedPost, seedPostSlugs, seedSettings } from "./seed";

const revalidate = 60;

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  return client.fetch<T>(groq, params, { next: { revalidate } });
}

/**
 * A Sanity settings document that predates the "Business info" fields has no `business.url`,
 * which silently disables all JSON-LD. Fill gaps from the seed and the canonical site origin.
 */
function withBusinessDefaults(settings: SiteSettings): SiteSettings {
  const fallback = seedSettings().business;
  const business = settings.business;
  return {
    ...settings,
    description: settings.description ?? seedSettings().description,
    business: {
      ...fallback,
      ...business,
      url: SITE_URL,
      hours: business?.hours?.length ? business.hours : fallback?.hours,
    },
  };
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return withBusinessDefaults(seedSettings());
  return withBusinessDefaults((await query<SiteSettings | null>(SETTINGS_QUERY)) ?? seedSettings());
}

/** The home page comes only from the Sanity `homePage` document; there is no seed fallback. */
export async function getHomePage(): Promise<Page | null> {
  if (!isSanityConfigured) return null;
  return query<Page | null>(HOME_QUERY);
}

export async function getPage(slug: string): Promise<Page | null> {
  if (!isSanityConfigured) return seedPage(slug);
  return query<Page | null>(PAGE_QUERY, { slug });
}

export async function getPageSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return seedPageSlugs();
  return query<string[]>(PAGE_SLUGS_QUERY);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  if (!isSanityConfigured) return seedPost(slug);
  return query<PostDetail | null>(POST_QUERY, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return seedPostSlugs();
  return query<string[]>(POST_SLUGS_QUERY);
}
