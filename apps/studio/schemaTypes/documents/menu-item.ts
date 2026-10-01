import { InlineIcon } from "@sanity/icons/Inline";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Menu item — one per WordPress `menu_items` row. Categories list their items
 * (and their order); an item can appear in more than one category.
 */
export const menuItem = defineType({
  name: "menuItem",
  title: "Menu item",
  type: "document",
  icon: InlineIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "richText", group: "content" }),
    defineField({ name: "image", type: "media", group: "content" }),
    defineField({
      name: "orderUrl",
      title: "Order link",
      type: "url",
      group: "content",
      description: "Where “Order” sends people for this item. Leave empty to use the site default.",
    }),
    defineField({ name: "price", type: "number", group: "details", validation: (r) => r.min(0).precision(2) }),
    defineField({ name: "calories", type: "number", group: "details" }),
    defineField({
      name: "allergens",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "pairsWith",
      title: "Pairs with",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "seo", type: "menuSeo", group: "seo" }),
  ],
  orderings: [{ title: "Title", name: "title", by: [{ field: "title", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "image.image" },
  },
});
