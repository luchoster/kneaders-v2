import { SplitHorizontalIcon } from "@sanity/icons/SplitHorizontal";
import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";
import { preview } from "./_preview";

export const colorBlocks = defineType({
  name: "colorBlocks",
  title: "Color blocks",
  type: "object",
  icon: SplitHorizontalIcon,
  description: "Two saturated call-to-action blocks side by side.",
  fields: [
    defineField({
      name: "blocks",
      type: "array",
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          name: "colorBlock",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "cta", title: "Button", type: "cta" }),
            toneField("tone", "Block color", { initialValue: "red" }),
            toneField("textTone", "Text color", { initialValue: "cream" }),
            defineField({ name: "image", type: "media", description: "Optional small plate." }),
            defineField({ name: "sticker", type: "sticker" }),
          ],
          preview: { select: { title: "title", subtitle: "tone" } },
        }),
      ],
    }),
    defineField({
      name: "tuckUnder",
      title: "Tuck under previous section",
      description: "Removes the top padding so the blocks sit right under a same-color section.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: preview("Color blocks", "blocks.0.title"),
});
