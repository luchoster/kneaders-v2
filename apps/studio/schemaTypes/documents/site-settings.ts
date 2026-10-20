import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";
import { menuLinkFields, menuLinkPreview } from "../objects/menu-link";

const linkList = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "menuLink" })] });

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const timeField = (name: string) =>
  defineField({
    name,
    type: "string",
    description: "24-hour time, e.g. 06:00 or 20:30.",
    validation: (rule) => rule.required().regex(TIME, { name: "HH:MM" }),
  });

const hoursField = (description: string) =>
  defineField({
    name: "hours",
    title: "Opening hours",
    type: "array",
    description,
    of: [
      defineArrayMember({
        name: "openingHours",
        type: "object",
        fields: [
          defineField({
            name: "days",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
            options: { list: DAYS, layout: "grid" },
            validation: (rule) => rule.required().min(1),
          }),
          timeField("opens"),
          timeField("closes"),
        ],
        preview: {
          select: { days: "days", opens: "opens", closes: "closes" },
          prepare: ({ days, opens, closes }) => ({
            title: (days as string[] | undefined)?.map((d) => d.slice(0, 3)).join(", ") || "No days",
            subtitle: `${opens ?? "?"} – ${closes ?? "?"}`,
          }),
        },
      }),
    ],
  });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
    { name: "business", title: "Business info" },
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
            ...menuLinkFields,
            defineField({ name: "key", type: "string", description: "Matches a page's “Highlighted nav item”." }),
          ],
          preview: menuLinkPreview,
        }),
      ],
    }),
    defineField({
      name: "business",
      title: "Business info",
      type: "object",
      group: "business",
      description: "Published to search engines and AI assistants as schema.org structured data.",
      fields: [
        defineField({
          name: "url",
          title: "Site URL",
          type: "url",
          description: "Canonical origin, e.g. https://www.kneaders.com",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "logo", type: "media" }),
        defineField({ name: "email", type: "string", validation: (rule) => rule.email() }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "priceRange", title: "Price range", type: "string", description: "e.g. $ or $$" }),
        defineField({ name: "cuisines", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
        defineField({ name: "foundingYear", title: "Founding year", type: "number" }),
        defineField({
          name: "sameAs",
          title: "Social & directory profiles",
          type: "array",
          description: "Instagram, Facebook, Google Business Profile, Yelp…",
          of: [defineArrayMember({ type: "url" })],
        }),
        hoursField("Company-wide hours. A location can override these."),
        defineField({
          name: "locations",
          type: "array",
          of: [
            defineArrayMember({
              name: "businessLocation",
              type: "object",
              fields: [
                defineField({ name: "name", type: "string", description: "e.g. Kneaders — Orem", validation: (rule) => rule.required() }),
                defineField({ name: "street", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "city", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "region", title: "State", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "postalCode", title: "ZIP", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "country", type: "string", initialValue: "US" }),
                defineField({ name: "phone", type: "string" }),
                defineField({ name: "latitude", type: "number" }),
                defineField({ name: "longitude", type: "number" }),
                defineField({ name: "mapUrl", title: "Map link", type: "url" }),
                hoursField("Leave empty to use the company-wide hours."),
              ],
              preview: { select: { title: "name", subtitle: "city" } },
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "rewardsLink", title: "Rewards link", type: "menuLink", group: "header" }),
    defineField({ name: "orderCta", title: "Order button", type: "menuLink", group: "header" }),
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
