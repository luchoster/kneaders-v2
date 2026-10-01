import { SearchIcon } from "@sanity/icons/Search";
import { defineField, defineType } from "sanity";

/** Per-item SEO — mirrors every Yoast field from the WordPress menu API. */
export const menuSeo = defineType({
  name: "menuSeo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fieldsets: [
    { name: "social", title: "Social sharing", options: { collapsible: true, collapsed: true } },
    { name: "advanced", title: "Advanced", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      validation: (r) => r.max(170).warning("Keep it under 170 characters"),
    }),
    defineField({ name: "focusKeyword", title: "Focus keyword", type: "string" }),
    defineField({ name: "metaKeywords", title: "Meta keywords", type: "string" }),
    defineField({ name: "ogTitle", title: "Open Graph title", type: "string", fieldset: "social" }),
    defineField({ name: "ogDescription", title: "Open Graph description", type: "text", rows: 2, fieldset: "social" }),
    defineField({ name: "ogImage", title: "Open Graph image", type: "image", fieldset: "social" }),
    defineField({ name: "twitterTitle", title: "Twitter title", type: "string", fieldset: "social" }),
    defineField({ name: "twitterDescription", title: "Twitter description", type: "text", rows: 2, fieldset: "social" }),
    defineField({ name: "twitterImage", title: "Twitter image", type: "image", fieldset: "social" }),
    defineField({ name: "canonical", title: "Canonical URL", type: "url", fieldset: "advanced" }),
    defineField({ name: "redirect", title: "Redirect URL", type: "string", fieldset: "advanced" }),
    defineField({ name: "noindex", title: "Hide from search engines", type: "boolean", fieldset: "advanced" }),
    defineField({ name: "nofollow", title: "Don't follow links", type: "boolean", fieldset: "advanced" }),
    defineField({ name: "robotsAdvanced", title: "Advanced robots directives", type: "string", fieldset: "advanced" }),
    defineField({
      name: "seoScore",
      title: "Yoast SEO score",
      type: "number",
      fieldset: "advanced",
      readOnly: true,
      description: "Imported from WordPress (Yoast “linkdex”). Informational only.",
    }),
  ],
});
