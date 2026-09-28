import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField, toneField } from "../objects/fields";
import { preview } from "./_preview";

export const formSection = defineType({
  name: "formSection",
  title: "Form",
  type: "object",
  icon: EnvelopeIcon,
  description: "Intro copy (+ optional ticket) with a configurable form.",
  fields: [
    anchorField,
    defineField({
      name: "formId",
      title: "Form ID",
      type: "string",
      description: "Identifies submissions (e.g. catering-inquiry).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "background",
      type: "string",
      initialValue: "tan",
      options: { list: ["tan", "cream"], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "headline", type: "splitHeadline", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({ name: "contactLine", type: "string", description: "e.g. email · phone" }),
    defineField({ name: "ticket", type: "ticket" }),
    defineField({
      name: "fields",
      type: "array",
      of: [
        defineArrayMember({
          name: "formField",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "name", title: "Field name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "kind",
              type: "string",
              initialValue: "text",
              options: { list: ["text", "email", "tel", "date", "number", "textarea", "select"] },
            }),
            defineField({ name: "placeholder", type: "string" }),
            defineField({
              name: "width",
              type: "string",
              initialValue: "half",
              options: { list: ["half", "full"], layout: "radio", direction: "horizontal" },
            }),
            defineField({
              name: "options",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              hidden: ({ parent }) => parent?.kind !== "select",
            }),
            defineField({ name: "rows", type: "number", hidden: ({ parent }) => parent?.kind !== "textarea" }),
            defineField({ name: "min", type: "number", hidden: ({ parent }) => parent?.kind !== "number" }),
            defineField({ name: "required", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label", subtitle: "kind" } },
        }),
      ],
    }),
    defineField({ name: "submitLabel", type: "string", initialValue: "Send", validation: (r) => r.required() }),
    toneField("submitTone", "Submit button color", { initialValue: "red" }),
  ],
  preview: preview("Form"),
});
