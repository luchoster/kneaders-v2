import { defineField, defineType } from "sanity";
import { toneField } from "./fields";

export const sticker = defineType({
  name: "sticker",
  title: "Sticker",
  type: "object",
  description: "Small rotated label (e.g. “Limited time”).",
  options: { columns: 3 },
  fields: [
    defineField({ name: "text", type: "string", validation: (r) => r.required().max(24) }),
    toneField("tone", "Background"),
    toneField("textTone", "Text"),
  ],
});
