import { DocumentIcon } from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";
import { pageGroups, sectionsField, seoField } from "./page-fields";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: pageGroups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      description: "The homepage lives in “Home page”, not here.",
      options: { source: "title" },
      validation: (r) =>
        r.required().custom((slug) => (slug?.current === "home" ? "“home” is reserved — edit the Home page instead" : true)),
    }),
    defineField({
      name: "navKey",
      title: "Highlighted nav item",
      type: "string",
      group: "content",
      description: "Matches a nav link key in Site settings (menu, catering, journal, story, contact).",
    }),
    sectionsField,
    seoField,
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug ?? ""}` }),
  },
});
