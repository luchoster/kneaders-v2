import { ThListIcon } from "@sanity/icons/ThList";
import { defineField, defineType } from "sanity";

export const menuBoard = defineType({
  name: "menuBoard",
  title: "Menu board",
  type: "object",
  icon: ThListIcon,
  description:
    "Sticky category bar + one color-coded band per menu category with expandable item details. Items come from “Menu categories”.",
  fields: [
    defineField({
      name: "orderCta",
      title: "Order button (in item details)",
      type: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "All menu categories", subtitle: "Menu board" }) },
});
