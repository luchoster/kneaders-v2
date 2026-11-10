import { createImageUrlBuilder } from "@sanity/image-url";
import type { Media } from "@kneaders/content";
import { dataset, isSanityConfigured, projectId } from "./sanity/env";

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Uploaded Sanity asset wins (with the editor's crop applied); otherwise fall back to the external URL. */
export function mediaSrc(media: Media | null | undefined, width = 1400): string | undefined {
  if (!media) return undefined;
  if (media.image?.asset?._ref && builder) {
    return builder.image(media.image).width(width).fit("max").auto("format").url();
  }
  return media.externalUrl || undefined;
}

const pct = (n: number) => `${Math.round(Math.min(1, Math.max(0, n)) * 1000) / 10}%`;

/**
 * The editor's Sanity hotspot as a CSS `object-position`, so the focal point
 * stays in frame at whatever ratio the photo is cropped to. Hotspot coordinates
 * are relative to the full image, so they're re-based onto the cropped one.
 */
export function mediaFocus(media: Media | null | undefined): string | undefined {
  const hotspot = media?.image?.hotspot;
  if (!hotspot) return undefined;
  const crop = media?.image?.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const width = 1 - crop.left - crop.right;
  const height = 1 - crop.top - crop.bottom;
  if (width <= 0 || height <= 0) return undefined;
  return `${pct((hotspot.x - crop.left) / width)} ${pct((hotspot.y - crop.top) / height)}`;
}
