import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

export const menuBoard = defineType({
  name: "menuBoard",
  title: "Menu categories",
  type: "object",
  icon: ThListIcon,
  description:
    "Sticky category bar + one color-coded band per category with expandable item details. Items (and their order) come from each category.",
  fields: [
    defineField({
      name: "categories",
      type: "array",
      description: "Drag to reorder.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "menuCategory" }] })],
      validation: (r) => r.required().min(1).unique(),
    }),
    defineField({
      name: "orderCta",
      title: "Order button (in item details)",
      type: "cta",
    }),
  ],
  preview: {
    select: { count: "categories.length", first: "categories.0.title" },
    prepare: ({ count, first }) => ({
      title: count ? `${count} categories` : "No categories yet",
      subtitle: first ? `Menu categories · starts with ${first}` : "Menu categories",
    }),
  },
});
