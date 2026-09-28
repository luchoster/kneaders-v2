import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";
import { journalTags } from "@kneaders/content";

export const post = defineType({
  name: "post",
  title: "Journal post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "tag",
      type: "string",
      description: "Drives the tag color (Story = gold, Recipe = sage, Field = blue, How-to = rust).",
      options: { list: journalTags, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published", type: "date", validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "Read time", type: "string", description: "e.g. “5 min”" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "authorRole", title: "Author role", type: "string", initialValue: "Contributor" }),
    defineField({ name: "excerpt", type: "text", rows: 2, validation: (r) => r.max(200) }),
    defineField({ name: "image", title: "Cover image", type: "media" }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Lede (italic intro)", value: "lede" },
            { title: "Heading", value: "h3" },
            { title: "Pull quote", value: "blockquote" },
          ],
          lists: [],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "tag", media: "image.image" } },
});
