import { defineField, defineType } from "sanity";
import { toneField } from "./fields";

/** Two-part headline — each half can carry its own brand tone. */
export const splitHeadline = defineType({
  name: "splitHeadline",
  title: "Headline",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "lead", title: "First part", type: "string", validation: (r) => r.required() }),
    toneField("leadTone", "First part tone", { description: "Leave empty for the section default." }),
    defineField({ name: "rest", title: "Second part", type: "string" }),
    toneField("restTone", "Second part tone", { description: "Leave empty for the section default." }),
    defineField({
      name: "stacked",
      title: "Second part on its own line",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { lead: "lead", rest: "rest" },
    prepare: ({ lead, rest }) => ({ title: [lead, rest].filter(Boolean).join(" ") }),
  },
});
