import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";
import { toneField } from "../objects/fields";
import { preview } from "./_preview";

export const teamGrid = defineType({
  name: "teamGrid",
  title: "Team bios",
  type: "object",
  icon: UsersIcon,
  description: "Executive / founder bios with squircle headshots.",
  fields: [
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "members",
      type: "array",
      of: [
        defineArrayMember({
          name: "teamMember",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", type: "string" }),
            defineField({ name: "photo", type: "media" }),
            defineField({ name: "bio", type: "text", rows: 4 }),
            toneField("tone", "Plate color", { description: "Defaults to the gold/sage/blue/red cycle." }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo.image" } },
        }),
      ],
    }),
  ],
  preview: preview("Team bios", "heading"),
});
