# Kneaders Bakery & Café — Design System

> Working spec, v3 — retokened to the official kdrs Simple Style Guide (uploads/kdrs_SimpleStyleGuide.pdf). Black + tan primaries, muted earth-tone supporting palette, Amnesia Distressed / Archer Pro (Arvo) / Barlow type system. Shop, Events, and Locations are out of this version.

---

## 1. Principles

1. **Bakery-first, not SaaS.** Warm, tactile, parchment-colored, hand-shaped. Avoid cool tech tropes — no purple gradients, neon glows, abstract geometry, or screenshot-of-a-dashboard hero shots.
2. **Editorial, not retail.** Long-scroll storytelling, real numbers (ESt 1997, "12 hands per loaf"), specific copy, generous whitespace. The site reads like a magazine that happens to take orders.
3. **Calm by default, red on purpose.** Cream and brown carry 90% of the surface. Bakery red is reserved for primary actions, seasonal moments, and "act now" pressure — never for decoration.
4. **Hand over machine.** Hairlines, eyebrows, monospace numerals, and serif italics. Avoid heavy drop shadows, glossy buttons, and overdesigned cards.
5. **One brand, four temperaments.** Theme + accent + type + density compose into seasonal looks (default cream + bakery red is the canonical brand stance).

---

## 2. Color tokens

All colors are exposed as CSS variables on `:root` in `shared/tokens.css`. Use the variable, not the hex.

### 2.1 Brand foundation

| Token | Hex | Role |
|---|---|---|
| `--hl-house` | `#803B24` | **Primary brown** (PMS 1685C). Wax-stamp seal, brand mark, hover ink. |
| `--hl-crust` | `#A4541C` | **Secondary rust** (PMS 160C). Supporting emphasis. |
| `--hl-accent` | `#801B21` | **Accent brick red** (PMS 491C). Primary CTAs, seasonal flags, pressure. |
| `--hl-accent-2` | `#56252A` | Brick red hover/pressed (PMS 490C). |
| `--hl-accent-tint` | `#E7CFC4` | Brick red tint — soft promotional fields. |
| `--hl-error` | `#801B21` | Error state (shared with accent, PMS 491C). |

### 2.2 Surface + ink

| Token | Hex | Role |
|---|---|---|
| `--hl-bg` | `#EFE1C5` | **Neutral** — tan page background (PMS 7501C 50%). |
| `--hl-bg-warm` | `#F8F2E2` | **Surface** — lighter tan cards, elevated panels. |
| `--hl-bg-deep` | `#D9C79E` | Deep tan (PMS 7501C). Image frames, placeholder backdrop. |
| `--hl-ink` | `#231F20` | **On-surface** — brand black (PMS Black C). Body text. |
| `--hl-ink-2` | `#56252A` | Deep maroon (PMS 490C). Section heads, supporting hierarchy. |
| `--hl-ink-3` | `#803B24` | Brown (PMS 1685C). Eyebrows, captions, meta. |
| `--hl-line` | `#D9C79E` | Hairline rules, chip borders, dividers. |
| `--hl-line-soft` | `#E5D8B8` | Softer divider for nested sections. |

### 2.3 Themes (data-theme on `<html>`)

- **`light`** (default) — parchment field, espresso ink. Used for 95% of pages.
- **`moody`** — brand black `#231F20`, tan ink (the guide's "2-color reversed on dark/black").
- **`dark`** — true dark `#141112` for accessibility-leaning. Same brand warmth.

### 2.4 Accents (data-accent on `<html>`)

`bakery-red` is the brand default. The others are seasonal alternates that don't change the palette's center of gravity.

- `bakery-red` = Brick Red #801B21 (default) · `sage` #74813B · `butter` = Harvest Gold #C7812A · `rose` = Lake Blue #4B8496 · `persimmon` = Rust #A4541C — all from the guide's supporting palette. Keys kept for back-compat.

---

## 3. Typography

The system pairs an **editorial display** voice with a clean **sans-serif** for UI and a small **mono** for utility.

### 3.1 Stacks (CSS variables)

```css
--hl-headline: "Amnesia Distressed", "Arvo", serif; /* official — heroes, ALL CAPS */
--hl-display:  "Archer Pro", "Arvo", Georgia, serif; /* official — sub-headlines */
--hl-serif:    "Barlow", system-ui, sans-serif;      /* main body */
--hl-mono:     "Barlow Condensed", sans-serif;       /* supporting accent: calories, meta, eyebrows */
```
Per the guide: headlines (h1) render in Amnesia Distressed in all-caps (h1.hl-display is auto-styled); sub-heads use Archer Pro; body is Barlow; captions/eyebrows Barlow Condensed. All four are the OFFICIAL licensed files, self-hosted from uploads/ via shared/fonts.css — no Google Fonts dependency.

### 3.2 Type pairings (data-type on `<html>`)

- **`grotesk-serif`** (default) — Archer Pro display + Barlow body. The guide's standard pairing.
- **`serif-display`** — Arvo display + Archer Pro body. Slab-forward alternate.
- **`condensed`** — Barlow Condensed display + Barlow body. Tight headlines.

### 3.3 Roles & sizes

| Role | Stack | Size (clamp) | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| Display / hero | `--hl-display` | `clamp(56px, 8.4vw, 148px)` | 600 | `-0.035em` | 0.92 |
| H1 page | `--hl-display` | `clamp(40px, 6.4vw, 96px)` | 600 | `-0.03em` | 0.96 |
| H2 section | `--hl-display` | `clamp(32px, 4.4vw, 56px)` | 600 | `-0.025em` | 0.98 |
| H3 card | `--hl-display` | `22px` | 600 | `-0.018em` | 1.15 |
| Body lede | `--hl-serif` italic | `clamp(20px, 2vw, 26px)` | 500 | 0 | 1.35 |
| Body | `--hl-serif` | `17–19px` | 400 | 0 | 1.55 |
| Body small | `--hl-serif` | `14–15px` | 400 | 0 | 1.5 |
| Eyebrow | `--hl-mono` | `11px` | 500 | `0.18em` upper | 1.2 |
| Meta / caption | `--hl-mono` | `10–11px` | 500 | `0.14em` upper | 1.2 |
| Pull quote | `--hl-serif` italic | `clamp(24px, 2.4vw, 32px)` | 400 | 0 | 1.25 |

### 3.4 Type rules

- **Always use `text-wrap: balance` on headings** and `text-wrap: pretty` on body paragraphs.
- **Display sizes use negative tracking** (`-0.02em` to `-0.035em`); body is neutral; eyebrows/mono are widely tracked uppercase.
- **Mix serif italic into display** for editorial flavor — *"with us."* — but never mix more than two type voices in one block.
- **Drop caps** allowed on the first paragraph of long-form articles only. 64px, lh 0.85, float left, 14px right margin.

---

## 4. Spacing & layout

### 4.1 Density (data-density on `<html>`)

- **`compact`** — `--hl-section-y: clamp(48px, 6vw, 96px)`; gutter `clamp(16px, 3vw, 28px)`.
- **`editorial`** (default) — `--hl-section-y: clamp(72px, 9vw, 140px)`; gutter `clamp(20px, 4vw, 40px)`.
- **`loose`** — `--hl-section-y: clamp(96px, 12vw, 180px)`; gutter `clamp(28px, 5vw, 56px)`.

### 4.2 Container

- Max width: `1440px`, centered.
- Padding-left/right: `var(--hl-gutter)`.
- Use `.hl-container` utility on every section.

### 4.3 Grid

- 12-column inside the container, `gap-x-8 gap-y-12` on Tailwind.
- Article body: 3 / 9 split (sticky TOC + reading column capped to `68ch`).
- Detail pages: 7 / 5 split (content + sticky sidebar).
- Card grids: 12 → 6 → 4 (mobile / tablet / desktop) with `gap-y-12`.

### 4.4 Section rhythm

Every major section starts with the **section-head triplet**:

```
[01] ───────── EYEBROW
What's on the bench.
```

That's: a monospaced number marker (`hl-num`), a hairline rule (`hl-hair`), a tracked eyebrow (`hl-eyebrow`), then a display-weight title and optional serif lede. Numbers run sequentially within a page (`01`, `02`, `03`, …) to give scroll position.

---

## 5. Shape language

| Token | Value | Use |
|---|---|---|
| `--hl-r-sm` | `4px` | Stamps, very small chips, image overlays |
| `--hl-r-md` | `10px` | Inputs, secondary cards, modals |
| `--hl-r-lg` | `18px` | Featured cards, large media wells |
| `pill` | `9999px` | Buttons, filter chips, accent tags |

**Rule of thumb:** rounded but not bubbly. Hard rectangles (0px) are reserved for *image frames* and *editorial blocks* — they read as "page" rather than "card." Buttons are always pill-shaped.

---

## 6. Elevation

Depth comes from **warm layering and hairlines**, not shadow. Use:

- `--hl-shadow-soft: 0 1px 2px rgba(31,24,18,0.04), 0 12px 28px -10px rgba(31,24,18,0.10)` — default lift on cards
- `--hl-shadow-lift: 0 12px 40px rgba(31,24,18,0.14)` — hover only

Most surfaces should use a **1px hairline** (`var(--hl-line)`) over a swap of background tone (`--hl-bg` ↔ `--hl-bg-warm` ↔ `--hl-bg-deep`) instead of a shadow.

Never use:
- Glossy / glass-morphism effects
- Inner shadows
- Heavy drop shadows (> 20% opacity)

---

## 7. Components

### 7.1 Button (`.hl-btn`)

Pill-shaped, 12px / 20px padding, `--hl-display` 14/500.

| Variant | Background | Text | Hover |
|---|---|---|---|
| `.hl-btn-primary` | `--hl-ink` (espresso) | `--hl-bg` | `--hl-house` (cocoa) |
| `.hl-btn-accent` | `--hl-accent` (bakery red) | `--hl-bg` | `--hl-accent-2` |
| `.hl-btn-ghost` | transparent + 1px ink border | `--hl-ink` | inverts to ink/bg |

**When to use which:**
- **Accent (red)** — single most important CTA per page (Order Now, Reserve a seat, Book catering).
- **Primary (espresso)** — supporting actions on warm fields (Read more, View menu).
- **Ghost** — tertiary, paired actions, dark backgrounds.

Never put two accent buttons on the same screen.

### 7.2 Chip (`.hl-chip`)

4px / 10px padding, 1px hairline, monospace 10px tracked. Use for tags, categories, and meta. `.hl-chip-accent` for active filter or "Featured" callouts.

### 7.3 Eyebrow (`.hl-eyebrow`)

Mono 11px, 0.18em tracking, uppercase, color `--hl-ink-3`. Always paired with a display heading underneath. Never standalone.

### 7.4 Card

- Background: `--hl-bg-warm` (or `--hl-bg-deep` for muted)
- Border: 1px `--hl-line`
- Radius: `--hl-r-lg` for featured, `--hl-r-md` for grid items
- Padding: `28px` desktop, `20px` mobile
- Image frame inside: hard 0px rectangle, `aspect-ratio: 5/4` or `21/9` for hero

### 7.5 Image frame (`.hl-img-frame`)

Always rectangular (no rounding on imagery). Subtle 0.55s zoom-in on hover (1.04 scale). Background = `--hl-bg-deep` while loading.

### 7.6 Wax seal (`.hl-seal`)

64px circle, 1px `--hl-house` border, mono 9px stacked text in cocoa. Used as a brand stamp on hero, in section dividers, and on the about page. **Sparingly** — 1–2 per page max.

### 7.7 Marquee (`.hl-marquee`)

Single-line scrolling band with hairlines top and bottom. 40s loop. Use for: opening hours, "free shipping over $50", seasonal announcements. Honors `prefers-reduced-motion`.

### 7.8 Form input

- Background: `--hl-bg-warm`
- Text: `--hl-ink`
- Border: 1px `--hl-line`, becomes `--hl-accent` on focus
- Radius: `--hl-r-md` (10px)
- Padding: `14px / 16px`

### 7.9 Section block label (`data-cms-block`)

When grid overlay is on (Tweaks → Show grid), every section reveals its semantic name (`hero`, `journal.featured`, `events.calendar`) so we can talk about blocks unambiguously.

---

## 8. Motion

- **Default ease:** `cubic-bezier(.2,.6,.2,1)` (the `easeOut` we use across Framer + CSS).
- **Page enter:** opacity 0 → 1, y +18px → 0, 0.6s, 100ms delay on heroes.
- **Stagger:** 40–60ms between siblings on grids.
- **Hover lift:** y -4px on links/cards, 0.3s.
- **Image zoom:** 1.04 scale on `.hl-img-frame:hover`, 0.55s.
- **Marquee:** 40s linear loop.

**All motion respects `prefers-reduced-motion`** via the `HL_useReducedMotion()` hook in `shared/shell.jsx`.

---

## 9. Iconography & imagery

- **Photography first.** Real food, real bakers, real ovens. Place on hard-rectangle frames, not rounded cards.
- **No SVG illustrations of food.** Use placeholders (`hl-placeholder` — diagonal cream stripes) until real photography is available.
- **No emoji.** This is a magazine, not a status bar.
- **Aspect ratios:** `21/9` for hero rails, `5/4` for grid cards, `4/5` for portrait stories, `1/1` for product tiles.

---

## 10. Voice & content

- **Specific over generic.** "12 hands per loaf" beats "made with love." "$8.50 boule" beats "artisan bread."
- **Sentence case** in headings unless it's a proper noun. Display-weight does the work.
- **Italicize the punchline.** *"with us."* / *"oven door."* / *"the kettle's on."*
- **Never use filler.** No lorem-ipsum sections, no "Why choose us?" lists. Every block earns its place.

---

## 11. Files & where things live

```
shared/
  fonts.css          ← @font-face for official brand fonts (files in uploads/)
  tokens.css         ← all CSS variables, themes, accents, density
  data.js            ← ALSO: HL_DATA.palette (brand hex, one source of truth for v2 pages)
                        and HL_DATA.categoryColors (product color-coding per style guide)
  shell.jsx          ← Nav, Footer, Section, SectionHead, image utilities
  data.js            ← content (categories, items, journal, events, locations)
  tweaks-app.jsx     ← Tweaks panel: theme / accent / type / density / hero variant
  kneaders-logo.png

home/sections.jsx
menu/sections.jsx
shop/sections.jsx
catering/sections.jsx
events/sections.jsx
events/detail.jsx
journal/sections.jsx
journal/article.jsx
story/sections.jsx
```

**Pages that exist:** `index.html`, `menu.html`, `catering.html`, `journal.html`, `article.html`, `story.html`. (Shop, events, and locations pages were removed from this version.)

When building a new section, **always**:

1. Use `<window.HL_Section block="..." tone="bg|warm|ink">` to wrap it (gives us the `data-cms-block` label).
2. Open with the section-head triplet (number + hairline + eyebrow + display heading).
3. Pull all colors from CSS variables in `tokens.css` — never hardcode hex.
4. Pull all content from `shared/data.js` — never hardcode product/copy strings inside a component.

---

## 12. Do's and don'ts

**Do**
- Lead with parchment + cocoa; sprinkle bakery red on actions only.
- Use real numbers and proper nouns wherever possible.
- Open every section with the eyebrow + number + hairline triplet.
- Honor `prefers-reduced-motion`.
- Test in `light` *and* `moody` themes before shipping a page.

**Don't**
- Add a fourth color to the palette without proposing a token.
- Use bakery red for backgrounds or large fields. It's a CTA color.
- Round image frames or use drop shadows on imagery.
- Mix more than two type voices in a single block.
- Add icons or emoji decoratively. Use a hairline or a number marker instead.
- Build a section without a section block label (`block="..."`).

---

*Last updated: v3 — retokened to the kdrs Simple Style Guide (black/tan + earth tones, Amnesia/Archer/Barlow type system).*
