import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineArrayMember, defineField, defineType } from "sanity";

/** The tilted bakery "order ticket" card. */
export const ticket = defineType({
  name: "ticket",
  title: "Order ticket",
  type: "object",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", title: "Tab label", type: "string", description: "e.g. “Order ticket”" }),
    defineField({ name: "number", title: "Ticket Nº", type: "string" }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "ticketStep",
          fields: [
            defineField({ name: "marker", type: "string", description: "01, '97, M–F…", validation: (r) => r.required() }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "marker" } },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "footer", type: "string", description: "e.g. “— thank you, come hungry —”" }),
  ],
});
