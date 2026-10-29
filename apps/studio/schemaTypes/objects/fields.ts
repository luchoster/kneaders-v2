import { defineField } from "sanity";
import { brandToneOptions, toneOptions, type Tone } from "@kneaders/content";

/**
 * Brand color picker — the site's four colors. Stores the style-guide key, e.g. "sage" (green).
 * `fullPalette` offers every style-guide color (menu categories only).
 */
export const toneField = (
  name: string,
  title: string,
  opts: { description?: string; initialValue?: Tone; hidden?: boolean; fullPalette?: boolean } = {},
) =>
  defineField({
    name,
    title,
    type: "string",
    description: opts.description,
    initialValue: opts.initialValue,
    hidden: opts.hidden,
    options: { list: opts.fullPalette ? toneOptions : brandToneOptions, layout: "dropdown" },
  });

/** In-page anchor (e.g. `inquire` → links like `#inquire`). */
export const anchorField = defineField({
  name: "anchorId",
  title: "Anchor ID",
  type: "string",
  description: "Optional. Lets buttons link here with #anchor-id.",
  validation: (rule) =>
    rule.regex(/^[a-z0-9-]+$/, { name: "kebab-case" }).warning("Use lowercase letters, numbers and dashes"),
});
