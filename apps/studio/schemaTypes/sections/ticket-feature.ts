import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineArrayMember, defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const ticketFeature = defineType({
  name: "ticketFeature",
  title: "Ticket feature",
  type: "object",
  icon: DocumentsIcon,
  description: "Copy paired with an order-ticket card (steps, perks, timelines, hours).",
  fields: [
    defineField({
      name: "theme",
      type: "string",
      initialValue: "light",
      options: { list: ["light", "dark"], layout: "radio", direction: "horizontal" },
    }),
    defineField({
      name: "ticketPosition",
      type: "string",
      initialValue: "right",
      options: { list: ["left", "right"], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "paragraphs", type: "array", of: [defineArrayMember({ type: "text", rows: 3 })] }),
    defineField({ name: "quote", type: "string" }),
    defineField({ name: "chips", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
    defineField({ name: "ticket", type: "ticket", validation: (r) => r.required() }),
  ],
  preview: preview("Ticket feature"),
});
