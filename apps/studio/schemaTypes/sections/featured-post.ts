import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

export const featuredPost = defineType({
  name: "featuredPost",
  title: "Featured post",
  type: "object",
  icon: DocumentTextIcon,
  description: "Lead journal story. Leave empty to show the latest post.",
  fields: [
    defineField({ name: "post", type: "reference", to: [{ type: "post" }] }),
    defineField({ name: "sticker", type: "sticker" }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", initialValue: "Read the story" }),
  ],
  preview: {
    select: { title: "post.title" },
    prepare: ({ title }) => ({ title: title || "Latest post", subtitle: "Featured post" }),
  },
});
