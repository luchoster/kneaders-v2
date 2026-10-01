/**
 * Snapshots the live kneaders.com menu from the WordPress REST API into
 * scripts/wp-menu/data/wp-menu.json (raw, untransformed).
 *
 *   pnpm --filter @kneaders/studio menu:fetch
 *
 * Categories come from the menu page's `select_menu_cat` field (that's what
 * kneaders.com/menu renders); items come from /menu_items/:slug per category.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { WpMenuSnapshot, WpMenuItemsResponse, WpMenuPage } from "./types";

const API = "https://wordpress.kneadersdw.com/wp-json/kneaders/v1";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

const page = await get<WpMenuPage>("/page/menu");
const snapshot: WpMenuSnapshot = {
  fetchedAt: new Date().toISOString(),
  source: API,
  categories: page.select_menu_cat,
  items: {},
};

for (const { menu_category: cat } of page.select_menu_cat) {
  const { total, rows } = await get<WpMenuItemsResponse>(`/menu_items/${cat.slug}`);
  if (rows.length !== total) console.warn(`  ! ${cat.slug}: API says ${total} items, got ${rows.length}`);
  snapshot.items[cat.slug] = rows;
  console.log(`  ${cat.slug.padEnd(18)} ${rows.length} items`);
}

const out = join(dirname(fileURLToPath(import.meta.url)), "data", "wp-menu.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Wrote ${page.select_menu_cat.length} categories → ${out}`);
