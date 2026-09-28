import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField, toneField } from "../objects/fields";
import { preview } from "./_preview";

export const colorCardGrid = defineType({
  name: "colorCardGrid",
  title: "Color card grid",
  type: "object",
  icon: ThLargeIcon,
  description: "Saturated cards — contact doors, open roles, giving pillars. Three cards = roomy 3-up layout.",
  fields: [
    anchorField,
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "numbered", title: "Show 01 / 02 / 03", type: "boolean", initialValue: false }),
    defineField({
      name: "cards",
      type: "array",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          name: "colorCard",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
            toneField("tone", "Card color", { initialValue: "gold" }),
            toneField("textTone", "Text color", { initialValue: "black" }),
            defineField({ name: "sticker", type: "string" }),
            defineField({ name: "email", type: "string" }),
            defineField({ name: "phone", type: "string" }),
            defineField({ name: "cta", title: "Link", type: "cta" }),
          ],
          preview: { select: { title: "title", subtitle: "tone" } },
        }),
      ],
    }),
  ],
  preview: preview("Color card grid", "heading"),
});
