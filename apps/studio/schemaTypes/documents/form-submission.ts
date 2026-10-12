import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A response to a CMS-configured form (`formSection`), written by the web app's
 * `POST /api/forms` route. Everything but `status` and `notes` is read-only.
 */
export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form submission",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In progress", value: "inProgress" },
          { title: "Done", value: "done" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({ name: "notes", title: "Internal notes", type: "text", rows: 3 }),
    defineField({ name: "formId", title: "Form ID", type: "string", readOnly: true }),
    defineField({ name: "page", title: "Submitted from", type: "string", readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted", type: "datetime", readOnly: true }),
    defineField({
      name: "entries",
      title: "Answers",
      type: "array",
      readOnly: true,
      of: [
        defineArrayMember({
          name: "formEntry",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Field name", type: "string" }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { formId: "formId", status: "status", submittedAt: "submittedAt", first: "entries.0.value" },
    prepare: ({ formId, status, submittedAt, first }) => ({
      title: first || formId || "Submission",
      subtitle: [formId, status, submittedAt && new Date(submittedAt).toLocaleString()].filter(Boolean).join(" · "),
    }),
  },
});
