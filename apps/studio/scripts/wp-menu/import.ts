/**
 * Imports the WordPress menu snapshot (scripts/wp-menu/data/wp-menu.json) into
 * Sanity: uploads every image as an asset, then creates-or-replaces all
 * `menuCategory` and `menuItem` documents (published).
 *
 *   pnpm --filter @kneaders/studio menu:import              # write to the dataset
 *   pnpm --filter @kneaders/studio menu:import -- --dry-run # transform only, no writes
 *
 * Safe to re-run: document IDs come from WP slugs, and images are tagged with
 * their source URL (`source.id`) so already-uploaded ones are reused.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { imageUrls, resolveImages, transform } from "./transform";
import type { WpMenuSnapshot } from "./types";

const DRY_RUN = process.argv.includes("--dry-run");
const SOURCE = "kneaders-wordpress";
const CONCURRENCY = 4;

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "data");
const snapshot: WpMenuSnapshot = JSON.parse(readFileSync(join(dataDir, "wp-menu.json"), "utf8"));
const { categories, items } = transform(snapshot);
const urls = imageUrls([categories, items]);

console.log(`${categories.length} categories, ${items.length} items, ${urls.length} images`);

if (DRY_RUN) {
  const out = join(dataDir, "preview.json");
  writeFileSync(out, JSON.stringify({ categories, items }, null, 2) + "\n");
  console.log(`Dry run — wrote transformed documents to ${out}`);
  process.exit(0);
}

const client = getCliClient({ apiVersion: "2026-09-01" }).withConfig({ perspective: "raw" });

/** Map of source URL → asset _id for images this script uploaded on an earlier run. */
const existing = new Map<string, string>(
  (
    await client.fetch<{ _id: string; url: string }[]>(
      `*[_type == "sanity.imageAsset" && source.name == $source]{ _id, "url": source.id }`,
      { source: SOURCE },
    )
  ).map((a) => [a.url, a._id]),
);

async function upload(url: string): Promise<string> {
  const cached = existing.get(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), {
    filename: decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "image"),
    contentType: res.headers.get("content-type") ?? undefined,
    source: { name: SOURCE, id: url, url },
  });
  return asset._id;
}

const assetIds = new Map<string, string>();
const failed: string[] = [];
let done = 0;
const queue = [...urls];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let url = queue.shift(); url; url = queue.shift()) {
      try {
        assetIds.set(url, await upload(url));
      } catch (err) {
        failed.push(url);
        console.error(`  ✗ ${(err as Error).message}`);
      }
      if (++done % 20 === 0 || done === urls.length) console.log(`  images ${done}/${urls.length}`);
    }
  }),
);
if (failed.length) {
  console.error(`${failed.length} image(s) failed — nothing written. Re-run to retry.`);
  process.exit(1);
}

type Doc = { _id: string; _type: string } & Record<string, unknown>;
// Items first: categories hold (strong) references to them.
const docs = ([...items, ...categories] as Doc[]).map((d) => resolveImages(d, assetIds));
for (let i = 0; i < docs.length; i += 50) {
  const tx = client.transaction();
  docs.slice(i, i + 50).forEach((d) => tx.createOrReplace(d));
  await tx.commit({ visibility: "async" });
}
console.log(`Wrote ${categories.length} categories and ${items.length} items.`);
