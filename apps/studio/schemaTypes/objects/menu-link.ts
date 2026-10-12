import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

type LinkParent = { linkType?: "internal" | "external"; href?: string } | undefined;

const isExternal = ({ parent }: { parent?: unknown }) => (parent as LinkParent)?.linkType === "external";
const isInternal = ({ parent }: { parent?: unknown }) => (parent as LinkParent)?.linkType !== "external";

/**
 * Fields for a header / footer menu link: either a reference to a page on this
 * site (optionally to a section on it) or an external URL. The web app turns
 * them into an `href` in its settings query.
 */
export const menuLinkFields = [
  defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  defineField({
    name: "linkType",
    title: "Link to",
    type: "string",
    initialValue: "internal",
    options: {
      list: [
        { title: "A page on this site", value: "internal" },
        { title: "An external URL", value: "external" },
      ],
      layout: "radio",
      direction: "horizontal",
    },
  }),
  defineField({
    name: "page",
    type: "reference",
    to: [{ type: "page" }, { type: "homePage" }],
    hidden: isExternal,
    validation: (r) =>
      r.custom((value, ctx) => (isInternal(ctx) && !value && !(ctx.parent as LinkParent)?.href ? "Choose a page" : true)),
  }),
  defineField({
    name: "anchor",
    title: "Section on the page",
    type: "string",
    description: "Optional. The section's anchor without the #, e.g. “soups” on the Menu page.",
    hidden: isExternal,
    validation: (r) =>
      r.regex(/^[a-z0-9-]+$/, { name: "kebab-case" }).warning("Use lowercase letters, numbers and dashes"),
  }),
  defineField({
    name: "url",
    title: "URL",
    type: "url",
    hidden: isInternal,
    validation: (r) =>
      r
        .uri({ scheme: ["http", "https", "mailto", "tel"] })
        .custom((value, ctx) => (isExternal(ctx) && !value ? "Enter a URL" : true)),
  }),
  defineField({
    name: "href",
    title: "Old link (plain text)",
    type: "string",
    description: "Kept from before links could point to pages. Used only when no page or URL is set.",
    readOnly: true,
    hidden: ({ value }) => !value,
  }),
];

const preview = {
  select: { title: "label", linkType: "linkType", page: "page.title", slug: "page.slug.current", anchor: "anchor", url: "url", href: "href" },
  prepare: ({ title, linkType, page, slug, anchor, url, href }: Record<string, string | undefined>) => ({
    title,
    subtitle:
      linkType === "external"
        ? url
        : page
          ? `${page} (/${slug ?? ""}${anchor ? `#${anchor}` : ""})`
          : href,
  }),
};

export const menuLink = defineType({
  name: "menuLink",
  title: "Menu link",
  type: "object",
  icon: LinkIcon,
  fields: menuLinkFields,
  preview,
});

export const menuLinkPreview = preview;
