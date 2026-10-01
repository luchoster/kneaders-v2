# Kneaders Bakery & Café

pnpm + Turborepo monorepo:

| Path | What |
|---|---|
| `apps/web` | Next.js 16 (App Router) + Tailwind CSS v4 + Motion — the public site |
| `apps/studio` | Sanity Studio v6 — content editing |
| `packages/content` | Shared brand palette, content types, and seed content |
| `design/` | Original design handoff (HTML prototypes, `design.md`, brand fonts) |

## Getting started

```bash
pnpm install
pnpm dev:web      # http://localhost:3000
pnpm dev:studio   # http://localhost:3333
```

The site works with **no CMS configured** — when `NEXT_PUBLIC_SANITY_PROJECT_ID`
is empty it renders the bundled seed content from `packages/content`.

### Connecting Sanity

1. Create a project at sanity.io/manage (or `npx sanity init` inside `apps/studio`).
2. Copy `apps/web/.env.example` → `apps/web/.env.local` and `apps/studio/.env.example` →
   `apps/studio/.env` and fill in the project ID / dataset.
3. Add `http://localhost:3000` as a CORS origin.
4. Load the seed content: `pnpm --filter @kneaders/studio seed:import`
   (exports `seed/seed.ndjson` and runs `sanity dataset import … --replace`).

## Page builder

The homepage (`/`) is the `homePage` singleton (Studio → **Home page**, document ID
`homePage`); every other page is a `page` document. Both have a `sections[]` array. Each section is a Sanity
object in `apps/studio/schemaTypes/sections/` with a matching React component in
`apps/web/src/components/sections/` (rendered by `PageBuilder`):

| Section | Used on |
|---|---|
| `pageHero` | Catering, Journal, Our Story, Contact, Giving, Careers |
| `promoCarousel`, `pillBand`, `categoryField`, `differenceBand`, `journalStrip` | Home |
| `colorBlocks` | Home (order / catering), Our Story (giving / careers) |
| `menuHero`, `menuBoard` | Menu |
| `ctaBand` | Menu, Our Story |
| `packageGrid`, `formSection` | Catering, Contact |
| `ticketFeature` | Catering, Careers, Our Story, Giving |
| `teamGrid`, `valuesGrid` | Our Story |
| `featuredPost`, `postGrid`, `newsletterBand` | Journal |
| `colorCardGrid` | Contact, Careers, Giving |

Other documents: `homePage` (singleton, `/`), `siteSettings` (top bar, nav, footer), `post` (journal articles →
`/journal/[slug]`), `menuCategory` + `menuItem` (Studio → **Menu**).

### Menu

Each `menuCategory` holds an ordered list of `menuItem` references (drag to reorder); an
item can sit in several categories. The `menuBoard` section ("Menu categories") takes an
ordered list of categories and renders each with its items in the category's order.

The menu was imported from the old WordPress site:

```bash
pnpm --filter @kneaders/studio menu:fetch               # snapshot WP → scripts/wp-menu/data/wp-menu.json
pnpm --filter @kneaders/studio menu:import -- --dry-run # preview transformed docs
pnpm --filter @kneaders/studio menu:import              # upload images + write documents
```

Re-running is safe (stable IDs; images are matched by source URL), but it **overwrites**
category/item documents — including any reordering done in the Studio.

To add a section: define the object schema, add it to `sectionTypes`, add its type to
`packages/content/src/types.ts`, build the component, and add a `case` to `PageBuilder`.

## Design tokens

- Palette: `packages/content/src/palette.ts` (mirrored in `apps/web/src/app/globals.css` `@theme`).
  CMS "tone" fields store palette keys (`gold`, `sage`, `red`, …).
- Category color-coding (style guide): `categoryTones` in the same file.
- Fonts: official Amnesia Distressed / Archer Pro / Barlow / Barlow Condensed via `next/font/local`
  (`apps/web/src/app/fonts.ts`) → `font-headline`, `font-display`, `font-body`, `font-condensed`.

## Open items

- Form + newsletter submissions are UI-only stubs (see `InquiryForm`, `NewsletterForm`).
- "Start an order" links point to `#` until an online-ordering URL exists.
- Seed images are external placeholder URLs; replace with uploaded photography in the Studio.
