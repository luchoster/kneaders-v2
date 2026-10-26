import localFont from "next/font/local";

/*
 * Official brand fonts per the kdrs Simple Style Guide (self-hosted, licensed files), served as
 * WOFF2 generated from the originals — see src/fonts/README.md. Every declared file is preloaded on
 * every page, so only the weights the site actually uses are declared.
 */

/** Amnesia Distressed — page headlines, ALL CAPS. */
export const amnesia = localFont({
  src: "../fonts/Amnesia-Distressed.woff2",
  variable: "--font-amnesia",
  weight: "400",
  display: "swap",
});

/** Archer Pro — sub-headlines / display (nav, buttons, card titles). */
export const archer = localFont({
  src: [
    { path: "../fonts/ArcherBookPro.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ArcherMediumPro.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ArcherSemiboldPro.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ArcherBoldPro.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-archer",
  display: "swap",
});

/** Arvo — the guide's web fallback for Archer Pro. Only fetched if Archer can't render a glyph. */
export const arvo = localFont({
  src: [
    { path: "../fonts/Arvo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Arvo-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arvo",
  display: "swap",
  preload: false,
});

/** Barlow — body copy. */
export const barlow = localFont({
  src: [
    { path: "../fonts/Barlow-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Barlow-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Barlow-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Barlow-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Barlow-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/Barlow-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

/** Barlow Condensed — supporting accent (eyebrows, meta, prices, calories). */
export const barlowCondensed = localFont({
  src: [
    { path: "../fonts/BarlowCondensed-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/BarlowCondensed-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/BarlowCondensed-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/BarlowCondensed-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/BarlowCondensed-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const fontVariables = [amnesia, archer, arvo, barlow, barlowCondensed]
  .map((f) => f.variable)
  .join(" ");
