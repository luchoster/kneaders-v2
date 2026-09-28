import { createImageUrlBuilder } from "@sanity/image-url";
import type { Media } from "@kneaders/content";
import { dataset, isSanityConfigured, projectId } from "./sanity/env";

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Uploaded Sanity asset wins; otherwise fall back to the external URL. */
export function mediaSrc(media: Media | null | undefined, width = 1400): string | undefined {
  if (!media) return undefined;
  if (media.image?.asset?._ref && builder) {
    return builder.image(media.image).width(width).fit("max").auto("format").url();
  }
  return media.externalUrl || undefined;
}
