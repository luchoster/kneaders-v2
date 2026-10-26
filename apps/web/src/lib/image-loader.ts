import type { ImageLoader } from "next/image";

const SANITY_CDN = "https://cdn.sanity.io/";

/**
 * Sanity's image CDN resizes and re-encodes (`auto=format` → AVIF/WebP) at the edge, so Sanity
 * assets skip the `/_next/image` hop: one fewer round trip for the LCP image and no origin CPU.
 */
export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
};

/** `loader` for `next/image`: Sanity assets go straight to the CDN; anything else keeps the default. */
export const imageLoader = (src: string | undefined): ImageLoader | undefined =>
  src?.startsWith(SANITY_CDN) ? sanityImageLoader : undefined;
