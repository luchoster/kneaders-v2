/** Canonical origin of the public site (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  "https://kneaders.zera.us"
).replace(/\/+$/, "");

/** Absolute URL for a site path. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
