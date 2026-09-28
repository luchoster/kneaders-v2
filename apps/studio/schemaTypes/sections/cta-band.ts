import { BellIcon } from "@sanity/icons/Bell";
import { defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";
import { preview } from "./_preview";

export const ctaBand = defineType({
  name: "ctaBand",
  title: "CTA band",
  type: "object",
  icon: BellIcon,
  description: "Loud, centered closing band with one or two buttons.",
  fields: [
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({
      name: "size",
      type: "string",
      initialValue: "large",
      options: { list: ["large", "medium"], layout: "radio", direction: "horizontal" },
    }),
    toneField("tone", "Band color", { initialValue: "red" }),
    defineField({ name: "primaryCta", title: "Primary button", type: "cta" }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "cta" }),
    defineField({
      name: "secondaryStyle",
      title: "Secondary button style",
      type: "string",
      initialValue: "solid",
      options: { list: ["solid", "outline"], layout: "radio", direction: "horizontal" },
    }),
  ],
  preview: preview("CTA band"),
});
