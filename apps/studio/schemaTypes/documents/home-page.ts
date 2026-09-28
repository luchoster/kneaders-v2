import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";
import { pageGroups, sectionsField, seoField } from "./page-fields";

/** Singleton (document ID `homePage`) rendered at `/`. */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: pageGroups,
  fields: [
    defineField({ name: "title", type: "string", group: "content", initialValue: "Home", validation: (r) => r.required() }),
    sectionsField,
    seoField,
  ],
  preview: { prepare: () => ({ title: "Home page", subtitle: "/" }) },
});
