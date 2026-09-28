import "server-only";
import type { Page, PostDetail, SiteSettings } from "@kneaders/content";
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
import { seedHomePage, seedPage, seedPageSlugs, seedPost, seedPostSlugs, seedSettings } from "./seed";

const revalidate = 60;

async function query<T>(groq: string, params: Record<string, string> = {}): Promise<T> {
  return client.fetch<T>(groq, params, { next: { revalidate } });
}

export async function getSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return seedSettings();
  return (await query<SiteSettings | null>(SETTINGS_QUERY)) ?? seedSettings();
}

export async function getHomePage(): Promise<Page | null> {
  if (!isSanityConfigured) return seedHomePage();
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
