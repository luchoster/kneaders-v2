import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryTones } from "@kneaders/content";
import { preview } from "./_preview";

export const promoCarousel = defineType({
  name: "promoCarousel",
  title: "Promo carousel",
  type: "object",
  icon: ImagesIcon,
  description: "Rotating banner: big squircle plate, sticker, two-tone headline.",
  fields: [
    defineField({
      name: "slides",
      type: "array",
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          name: "promoSlide",
          type: "object",
          fields: [
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "cta", title: "Button", type: "cta" }),
            defineField({ name: "image", type: "media", validation: (r) => r.required() }),
            defineField({
              name: "category",
              title: "Menu category",
              description: "Sets the plate color from the style-guide category color-coding.",
              type: "string",
              options: { list: Object.keys(categoryTones) },
            }),
            defineField({ name: "sticker", type: "sticker" }),
          ],
          preview: {
            select: { lead: "headline.lead", rest: "headline.rest", media: "image.image" },
            prepare: ({ lead, rest, media }) => ({ title: [lead, rest].filter(Boolean).join(" "), media }),
          },
        }),
      ],
    }),
    defineField({ name: "intervalSeconds", title: "Seconds per slide", type: "number", initialValue: 6.5 }),
  ],
  preview: preview("Promo carousel", "slides.0.headline.lead"),
});
