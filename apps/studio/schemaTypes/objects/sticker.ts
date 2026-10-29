import { defineField, defineType } from "sanity";
import { toneField } from "./fields";

export const sticker = defineType({
  name: "sticker",
  title: "Sticker",
  type: "object",
  description: "Small label (e.g. “Limited time”). Colors are set by the design.",
  options: { columns: 3 },
  fields: [
    defineField({ name: "text", type: "string", validation: (r) => r.required().max(24) }),
    // Kept so existing content stays valid; stickers now use one fixed style.
    toneField("tone", "Background", { hidden: true }),
    toneField("textTone", "Text", { hidden: true }),
  ],
});
