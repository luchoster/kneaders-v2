import { brandHex, brandTone, type Tone } from "@kneaders/content";
import type { CSSProperties } from "react";

/** CMS tone → one of the four brand colors (any style-guide tone is folded in). */
export const hex = (tone: Tone | undefined, fallback: Tone) => brandHex(tone, fallback);

/**
 * Tone-driven colors come from CMS data, so they're passed as CSS custom
 * properties and consumed by Tailwind arbitrary-property classes,
 * e.g. `bg-(--tone) text-(--ink)`.
 */
export const toneVars = (vars: Record<string, string | undefined>) => {
  const style: Record<string, string> = {};
  for (const [k, v] of Object.entries(vars)) if (v) style[`--${k}`] = v;
  return style as CSSProperties;
};

/** Cream text on the dark brand colors (black, brown, green), black text on cream/tan. */
export const inkOnField = (tone: Tone): Tone => (["cream", "tan"].includes(brandTone(tone)) ? "black" : "cream");

/** The CMS text tone, unless it would be unreadable on `field` — then the right ink for it. */
export const readableInk = (field: Tone | undefined, ink: Tone | undefined, fallback: Tone = "brown"): Tone => {
  const f = field ?? fallback;
  return ink && isLightField(ink, "cream") !== isLightField(f, fallback) ? ink : inkOnField(f);
};

/** True for the light brand grounds, where light-on-dark elements (stickers) need to flip. */
export const isLightField = (tone: Tone | undefined, fallback: Tone) =>
  ["cream", "tan"].includes(brandTone(tone, fallback));
