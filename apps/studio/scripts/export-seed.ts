/**
 * Writes the bundled seed content (@kneaders/content) to seed/seed.ndjson
 * for `sanity dataset import`. Run: pnpm --filter @kneaders/studio seed:import
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { seed } from "@kneaders/content";

/** Array field name → the schema's inline array-member type. */
const ARRAY_MEMBER_TYPES: Record<string, string> = {
  slides: "promoSlide",
  tiles: "categoryTile",
  blocks: "colorBlock",
  values: "valueItem",
  steps: "ticketStep",
  buttons: "heroButton",
  stats: "heroStat",
  packages: "cateringPackage",
  fields: "formField",
  members: "teamMember",
  cards: "colorCard",
  items: "menuItem",
  navLinks: "navLink",
  columns: "footerColumn",
  links: "cta",
  legalLinks: "cta",
};

function withTypes(value: unknown, field?: string): unknown {
  if (Array.isArray(value)) {
    const memberType = field ? ARRAY_MEMBER_TYPES[field] : undefined;
    return value.map((item) => {
      const typed = withTypes(item);
      if (memberType && typed && typeof typed === "object" && !("_type" in typed)) {
        return { _type: memberType, ...(typed as object) };
      }
      return typed;
    });
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withTypes(v, k)]));
  }
  return value;
}

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "seed", "seed.ndjson");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, seed.allSeedDocuments.map((d) => JSON.stringify(withTypes(d))).join("\n") + "\n");
console.log(`Wrote ${seed.allSeedDocuments.length} documents → ${out}`);
