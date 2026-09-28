import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";
import { journalTags } from "@kneaders/content";
import { toneField } from "../objects/fields";
import { preview } from "./_preview";

const noImage = ({ parent }: { parent?: { layout?: string } }) => parent?.layout === "textOnly";

export const pageHero = defineType({
  name: "pageHero",
  title: "Page hero",
  type: "object",
  icon: HomeIcon,
  description: "Interior page intro — text only, or paired with a squircle plate.",
  fields: [
    defineField({
      name: "layout",
      type: "string",
      initialValue: "wide",
      options: {
        list: [
          { title: "Text only", value: "textOnly" },
          { title: "Balanced (6 / 6)", value: "balanced" },
          { title: "Wide copy (7 / 5)", value: "wide" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "theme",
      type: "string",
      initialValue: "light",
      options: { list: ["light", "dark"], layout: "radio", direction: "horizontal" },
    }),
    defineField({
      name: "size",
      title: "Headline size",
      type: "string",
      initialValue: "large",
      options: { list: ["large", "medium"], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 4 }),
    defineField({
      name: "buttons",
      type: "array",
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          name: "heroButton",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "style",
              type: "string",
              initialValue: "solid",
              options: { list: ["solid", "outline"], layout: "radio", direction: "horizontal" },
            }),
            toneField("tone", "Color (solid)", { initialValue: "red" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "image", type: "media", hidden: noImage }),
    toneField("plateTone", "Plate color", { hidden: false }),
    defineField({ name: "sticker", type: "sticker", hidden: noImage }),
    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          name: "heroStat",
          type: "object",
          fields: [
            defineField({ name: "value", type: "string" }),
            defineField({ name: "label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tag chips",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: journalTags },
    }),
  ],
  preview: preview("Page hero"),
});
