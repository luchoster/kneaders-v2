import { defineArrayMember, defineField } from "sanity";
import { sectionTypes } from "../sections";

/** Page-builder fields shared by `page` and the `homePage` singleton. */

export const pageGroups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];

export const sectionsField = defineField({
  name: "sections",
  title: "Sections",
  type: "array",
  group: "content",
  of: sectionTypes.map((t) => defineArrayMember({ type: t.name })),
  options: {
    insertMenu: {
      filter: true,
      groups: [
        { name: "intro", title: "Heroes", of: ["pageHero", "promoCarousel", "menuHero"] },
        { name: "menu", title: "Menu", of: ["menuBoard", "categoryField"] },
        { name: "journal", title: "Journal", of: ["featuredPost", "postGrid", "journalStrip"] },
        {
          name: "blocks",
          title: "Content blocks",
          of: ["pillBand", "colorBlocks", "colorCardGrid", "differenceBand", "valuesGrid", "teamGrid", "packageGrid", "ticketFeature"],
        },
        { name: "conversion", title: "Calls to action", of: ["ctaBand", "formSection", "newsletterBand"] },
      ],
    },
  },
});

export const seoField = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  group: "seo",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.max(170).warning("Keep it under 170 characters") }),
  ],
});
