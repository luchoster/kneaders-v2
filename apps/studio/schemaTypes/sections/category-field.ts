import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryTones } from "@kneaders/content";
import { preview } from "./_preview";

export const categoryField = defineType({
  name: "categoryField",
  title: "Category field",
  type: "object",
  icon: ThLargeIcon,
  description: "Sage field of squircle category plates linking into the menu.",
  fields: [
    defineField({
      name: "tiles",
      type: "array",
      of: [
        defineArrayMember({
          name: "categoryTile",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "category",
              title: "Menu category",
              description: "Links to /menu#category and sets the plate color.",
              type: "string",
              options: { list: Object.keys(categoryTones) },
              validation: (r) => r.required(),
            }),
            defineField({ name: "image", type: "media" }),
          ],
          preview: { select: { title: "label", subtitle: "category", media: "image.image" } },
        }),
      ],
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
  ],
  preview: preview("Category field", "tagline"),
});
