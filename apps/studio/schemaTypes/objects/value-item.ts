import { defineField, defineType } from "sanity";
import { toneField } from "./fields";

export const valueItem = defineType({
  name: "valueItem",
  title: "Value",
  type: "object",
  fields: [
    defineField({ name: "number", type: "string", initialValue: "01" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
    toneField("tone", "Accent", { description: "Optional — defaults to the gold/sage/blue/red cycle." }),
  ],
  preview: { select: { title: "title", subtitle: "number" } },
});
