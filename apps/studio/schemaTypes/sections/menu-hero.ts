import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";
import { preview } from "./_preview";

export const menuHero = defineType({
  name: "menuHero",
  title: "Menu hero",
  type: "object",
  icon: HomeIcon,
  description: "Menu page intro: headline + bullets, featured plate, how-to ticket.",
  fields: [
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "featured",
      title: "Featured item",
      type: "object",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "image", type: "media" }),
        toneField("tone", "Plate color", { initialValue: "sage" }),
        defineField({ name: "sticker", type: "sticker" }),
      ],
    }),
    defineField({ name: "ticket", type: "ticket" }),
  ],
  preview: preview("Menu hero"),
});
