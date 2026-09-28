import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const pillBand = defineType({
  name: "pillBand",
  title: "Pill band",
  type: "object",
  icon: BulbOutlineIcon,
  description: "Harvest-gold pill that overlaps into the next section (e.g. Bread Club).",
  fields: [
    defineField({ name: "kicker", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
    defineField({ name: "sticker", type: "sticker" }),
  ],
  preview: preview("Pill band", "title"),
});
