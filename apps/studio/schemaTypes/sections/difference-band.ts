import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const differenceBand = defineType({
  name: "differenceBand",
  title: "Difference band",
  type: "object",
  icon: StarIcon,
  description: "Black band: photo plate + four numbered brand values.",
  fields: [
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "image", type: "media" }),
    defineField({ name: "sticker", type: "sticker" }),
    defineField({ name: "values", type: "array", of: [defineArrayMember({ type: "valueItem" })] }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
  ],
  preview: preview("Difference band"),
});
