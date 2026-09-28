import { defineField } from "sanity";
import { toneOptions, type Tone } from "@kneaders/content";

/** Brand-palette picker (kdrs Simple Style Guide). Stores the palette key, e.g. "sage". */
export const toneField = (
  name: string,
  title: string,
  opts: { description?: string; initialValue?: Tone; hidden?: boolean } = {},
) =>
  defineField({
    name,
    title,
    type: "string",
    description: opts.description,
    initialValue: opts.initialValue,
    hidden: opts.hidden,
    options: { list: toneOptions, layout: "dropdown" },
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
