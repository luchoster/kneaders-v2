import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

/** Uploaded image, or an external URL fallback (seed content uses Unsplash URLs). */
export const media = defineType({
  name: "media",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({ name: "image", title: "Upload", type: "image", options: { hotspot: true } }),
    defineField({
      name: "externalUrl",
      title: "…or external URL",
      type: "url",
      description: "Used only when no image is uploaded.",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo for screen readers.",
    }),
  ],
  preview: {
    select: { media: "image", alt: "alt", url: "externalUrl" },
    prepare: ({ media, alt, url }) => ({ title: alt || url || "Image", media: media ?? ImageIcon }),
  },
});
