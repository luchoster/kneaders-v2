import { palette, type Tone } from "@kneaders/content";
import type { CSSProperties } from "react";

export const hex = (tone: Tone | undefined, fallback: Tone) =>
  palette[tone ?? fallback] ?? palette[fallback];

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

/** Tones dark enough to need tan text (menu detail + package cards, per the prototype). */
const DARK_FIELDS: Tone[] = ["red", "maroon", "brown", "black"];
export const inkOnField = (tone: Tone): Tone => (DARK_FIELDS.includes(tone) ? "tan" : "black");
