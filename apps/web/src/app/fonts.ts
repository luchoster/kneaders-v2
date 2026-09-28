import localFont from "next/font/local";

/* Official brand fonts per the kdrs Simple Style Guide (self-hosted, licensed files). */

/** Amnesia Distressed — page headlines, ALL CAPS. */
export const amnesia = localFont({
  src: "../fonts/Amnesia-Distressed.otf",
  variable: "--font-amnesia",
  weight: "400",
  display: "swap",
});

/** Archer Pro — sub-headlines / display. */
export const archer = localFont({
  src: [
    { path: "../fonts/ArcherLightPro.otf", weight: "300", style: "normal" },
    { path: "../fonts/ArcherLightItalPro.otf", weight: "300", style: "italic" },
    { path: "../fonts/ArcherBookPro.otf", weight: "400", style: "normal" },
    { path: "../fonts/ArcherBookItalPro.otf", weight: "400", style: "italic" },
    { path: "../fonts/ArcherMediumPro.otf", weight: "500", style: "normal" },
    { path: "../fonts/ArcherSemiboldPro.otf", weight: "600", style: "normal" },
    { path: "../fonts/ArcherBoldPro.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-archer",
  display: "swap",
});

/** Arvo — the guide's web fallback for Archer Pro. */
export const arvo = localFont({
  src: [
    { path: "../fonts/Arvo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Arvo-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-arvo",
  display: "swap",
});

/** Barlow — body copy. */
export const barlow = localFont({
  src: [
    { path: "../fonts/Barlow-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Barlow-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Barlow-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/Barlow-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Barlow-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Barlow-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../fonts/Barlow-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Barlow-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

/** Barlow Condensed — supporting accent (eyebrows, meta, prices, calories). */
export const barlowCondensed = localFont({
  src: [
    { path: "../fonts/BarlowCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/BarlowCondensed-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/BarlowCondensed-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/BarlowCondensed-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/BarlowCondensed-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const fontVariables = [amnesia, archer, arvo, barlow, barlowCondensed]
  .map((f) => f.variable)
  .join(" ");
