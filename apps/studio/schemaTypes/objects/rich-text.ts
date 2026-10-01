import { BlockContentIcon } from "@sanity/icons/BlockContent";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Portable Text for descriptions and other long copy (paragraphs, bold/italic, links, lists). */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  icon: BlockContentIcon,
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [defineField({ name: "href", title: "URL", type: "string", validation: (r) => r.required() })],
          }),
        ],
      },
    }),
  ],
});
