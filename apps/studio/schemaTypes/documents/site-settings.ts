import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

const linkList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "cta" })] });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "header" }),
    defineField({ name: "description", type: "text", rows: 2, group: "header" }),
    defineField({
      name: "announcements",
      title: "Top-bar announcements",
      type: "array",
      group: "header",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "navLinks",
      title: "Primary navigation",
      type: "array",
      group: "header",
      of: [
        defineArrayMember({
          name: "navLink",
          type: "object",
          fields: [
            defineField({ name: "key", type: "string", description: "Matches a page's “Highlighted nav item”." }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "rewardsLink", title: "Rewards link", type: "cta", group: "header" }),
    defineField({ name: "orderCta", title: "Order button", type: "cta", group: "header" }),
    defineField({
      name: "footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "tagline", type: "array", of: [defineArrayMember({ type: "string" })], description: "One line per entry." }),
        defineField({ name: "newsletterHeading", type: "string" }),
        defineField({ name: "newsletterBody", type: "text", rows: 2 }),
        defineField({ name: "newsletterPlaceholder", type: "string" }),
        defineField({
          name: "columns",
          type: "array",
          of: [
            defineArrayMember({
              name: "footerColumn",
              type: "object",
              fields: [defineField({ name: "heading", type: "string" }), linkList("links", "Links")],
              preview: { select: { title: "heading" } },
            }),
          ],
        }),
        defineField({ name: "copyright", type: "string" }),
        linkList("legalLinks", "Legal / social links"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
