import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const journalStrip = defineType({
  name: "journalStrip",
  title: "Journal strip",
  type: "object",
  icon: DocumentTextIcon,
  description: "The latest journal posts (pulled automatically).",
  fields: [
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "cta", title: "Button", type: "cta" }),
    defineField({ name: "limit", title: "Number of posts", type: "number", initialValue: 3, validation: (r) => r.min(1).max(12) }),
  ],
  preview: preview("Journal strip"),
});
