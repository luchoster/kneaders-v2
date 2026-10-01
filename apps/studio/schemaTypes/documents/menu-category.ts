import { TagIcon } from "@sanity/icons/Tag";
import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";

/**
 * Menu category — one per WordPress `menu-category` term. Fields mirror the
 * `select_menu_cat` entries on the WP menu page plus each category's `hero`.
 */
export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  icon: TagIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "hero", title: "Hero" },
    { name: "legacy", title: "WordPress" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "Also the #anchor on the menu page.",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "richText", group: "content" }),
    toneField("tone", "Category color", {
      description: "Style-guide color-coding: breakfast/sandwiches = gold, salads/soups = sage, breads/pastries = brick red, beverages = lake blue, kids = rust.",
    }),
    defineField({
      name: "image",
      title: "Thumbnail",
      type: "media",
      group: "content",
      description: "Category tile on the menu landing page.",
    }),
    defineField({
      name: "items",
      title: "Menu items",
      type: "array",
      group: "content",
      description: "Drag to reorder — this is the order shown on the site.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "menuItem" }] })],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "subtitle", type: "string" }),
        defineField({ name: "image", type: "media" }),
      ],
    }),
    defineField({
      name: "wpId",
      title: "WordPress term ID",
      type: "number",
      group: "legacy",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "title", count: "items.length", media: "image.image" },
    prepare: ({ title, count, media }) => ({ title, subtitle: `${count ?? 0} items`, media }),
  },
});
