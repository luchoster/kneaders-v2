import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineField, defineType } from "sanity";
import { preview } from "./_preview";

export const postGrid = defineType({
  name: "postGrid",
  title: "Post grid",
  type: "object",
  icon: ThLargeIcon,
  description: "All journal posts, newest first.",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "offset",
      title: "Skip newest",
      description: "Skip this many of the newest posts (e.g. 1 when a Featured post sits above).",
      type: "number",
      initialValue: 1,
    }),
  ],
  preview: preview("Post grid", "heading"),
});
