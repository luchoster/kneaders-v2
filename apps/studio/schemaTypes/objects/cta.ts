import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Link / button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Internal path (/menu, /catering#inquire), #anchor, or full URL.",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
