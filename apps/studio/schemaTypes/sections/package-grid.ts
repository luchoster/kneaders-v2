import { PackageIcon } from "@sanity/icons/Package";
import { defineArrayMember, defineField, defineType } from "sanity";
import { anchorField, toneField } from "../objects/fields";
import { preview } from "./_preview";

export const packageGrid = defineType({
  name: "packageGrid",
  title: "Package grid",
  type: "object",
  icon: PackageIcon,
  description: "Color-blocked catering packages.",
  fields: [
    anchorField,
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    toneField("headingTone", "Heading color", { initialValue: "brown" }),
    defineField({
      name: "packages",
      type: "array",
      of: [
        defineArrayMember({
          name: "cateringPackage",
          type: "object",
          fields: [
            defineField({ name: "tier", type: "string" }),
            defineField({ name: "priceRange", type: "string" }),
            defineField({ name: "minimum", type: "string" }),
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "includes", type: "array", of: [defineArrayMember({ type: "string" })] }),
            defineField({ name: "image", type: "media" }),
            toneField("tone", "Card color", { description: "Defaults to the gold/sage/red/blue cycle." }),
          ],
          preview: { select: { title: "title", subtitle: "tier", media: "image.image" } },
        }),
      ],
    }),
    defineField({ name: "inquireHref", title: "“Inquire” link", type: "string", initialValue: "#inquire" }),
  ],
  preview: preview("Package grid", "heading"),
});
