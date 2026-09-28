import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const newsletterBand = defineType({
  name: "newsletterBand",
  title: "Newsletter band",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
    defineField({ name: "placeholder", type: "string", initialValue: "you@goodmorning.com" }),
    defineField({ name: "buttonLabel", type: "string", initialValue: "Subscribe" }),
  ],
  preview: preview("Newsletter band"),
});
