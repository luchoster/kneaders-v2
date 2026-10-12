import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const valuesGrid = defineType({
  name: "valuesGrid",
  title: "Values grid",
  type: "object",
  icon: StarIcon,
  description: "Numbered value cards with colored numbers.",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "values", type: "array", of: [defineArrayMember({ type: "valueItem" })] }),
  ],
  preview: preview("Values grid", "heading"),
});
