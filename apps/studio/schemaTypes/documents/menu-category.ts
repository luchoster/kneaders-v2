import { TagIcon } from "@sanity/icons/Tag";
import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Also the #anchor on the menu page.",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string" }),
    toneField("tone", "Category color", {
      description: "Style-guide color-coding: breakfast/sandwiches = gold, salads/soups = sage, breads/pastries = brick red, beverages = lake blue, kids = rust.",
    }),
    defineField({ name: "orderRank", title: "Order", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          name: "menuItem",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "price", type: "number", validation: (r) => r.required().min(0).precision(2) }),
            defineField({ name: "calories", type: "number" }),
            defineField({ name: "description", type: "text", rows: 3 }),
            defineField({
              name: "allergens",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
            }),
            defineField({
              name: "pairsWith",
              title: "Pairs with",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
            }),
            defineField({ name: "image", type: "media" }),
          ],
          preview: {
            select: { title: "name", price: "price", media: "image.image" },
            prepare: ({ title, price, media }) => ({
              title,
              subtitle: typeof price === "number" ? `$${price.toFixed(2)}` : undefined,
              media,
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Menu order", name: "order", by: [{ field: "orderRank", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
