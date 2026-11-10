# Kneaders v3 — Design Handoff Brief

**For:** Claude Code, implementing in the existing Next.js + Sanity site
**Reference prototype:** `design/v3/prototype/` (React-in-browser, not production code)
**Status:** Direction for client testing — build on a branch, ship to a preview deployment

---

## 1. Why v3 exists

The Kneaders team reviewed v2 and asked for a calmer, more current site. Their words, summarized:

- v2 felt **visually busy**: large bold all-caps headlines, and transitions between several strong background colors.
- They want **light backgrounds (white / cream), simple typography, and breathing room** around content.
- **Food photography should be the focal point.**
- It must still feel **warm, welcoming, and distinctly Kneaders**.
- Reference they like: auberginekitchen.com (light fields, simple type, generous spacing, photo-led sections that are easy to take in).

**Design rule of thumb:** if an element competes with the photo, remove it or quiet it.

---

## 2. What changed from v2 (do not reintroduce)

| Removed in v3 | Replaced with |
|---|---|
| Full-bleed colored section fields (sage, blue, red, black) | White `#FFFFFF` and cream `#FDFBF7` sections only, alternating; one soft tan wash for the footer |
| Distressed all-caps headline face (Amnesia Distressed) | Archer Pro **Light (300)**, sentence case, modest sizes |
| Squircle masked "plate" photos with offset color discs | Plain rectangular photos, 4px radius |
| Rotated stickers, tilted cards, "order ticket" cards | Nothing — use whitespace and hairline rules |
| Filled-block eyebrows | Plain uppercase Barlow Condensed text in rust |
| Scrolling marquee top bar | One static announcement line |
| Black footer | Tan-wash footer with dark ink |
| Expandable color-filled menu detail panels | Item details shown directly on each card |
| Tweaks panel (theme/accent/density switcher) | Not needed in production |

---

## 3. Design tokens

Map these into the Tailwind config (`theme.extend`) or CSS variables used by Tailwind — do **not** ship a parallel stylesheet.

### Color

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FDFBF7` | Page ground (cream) |
| `white` | `#FFFFFF` | Alternate sections |
| `wash` | `#F6F0E5` | Footer, announcement bar |
| `photo` | `#EDE3D1` | Image well while loading |
| `ink` | `#231F20` | Headings, primary text (PMS Black C) |
| `ink-2` | `#4F4440` | Body copy |
| `ink-3` | `#8B7C71` | Meta, captions |
| `line` | `#E7DDCB` | Hairline rules, input borders |
| `accent` | `#801B21` | Primary buttons, italic accent words (PMS 491C) |
| `accent-hover` | `#5E1418` | Button hover |
| `rust` | `#A4541C` | Eyebrow labels (PMS 160C) |

Category dots on the Menu rail keep the style-guide color-coding (`categoryColors` in `prototype/shared/data.js`) — dots only, never fills.

Brick red is an **accent**, not a field color. Budget: buttons + one italic phrase per headline + active nav underline.

### Typography

| Role | Font | Weight | Size | Line height | Notes |
|---|---|---|---|---|---|
| H1 | Archer Pro | 300 | `clamp(38px, 4.4vw, 64px)` | 1.08 | Sentence case, tracking −0.012em |
| H2 | Archer Pro | 300 | `clamp(30px, 3vw, 44px)` | 1.14 | |
| H3 | Archer Pro | 400 | `clamp(21px, 1.7vw, 25px)` | 1.25 | |
| H4 | Archer Pro | 400 | 19px | 1.3 | Card titles |
| Accent `<em>` in H1–H3 | Archer Pro Italic | 300 | inherit | — | Color `accent` |
| Eyebrow | Barlow Condensed | 500 | 13px | — | Uppercase, tracking 0.18em, color `rust` |
| Lede | Barlow | 400 | `clamp(17px, 1.3vw, 19px)` | 1.65 | `ink-2` |
| Body | Barlow | 400 | 16px | 1.65 | `ink-2` |
| Small | Barlow | 400 | 14px | 1.55 | |
| Meta | Barlow Condensed | 400 | 13px | — | tracking 0.08em, `ink-3` |
| Price | Archer Pro | 400 | 16–17px | — | `ink` |
| Pull quote | Archer Pro Italic | 300 | `clamp(26px, 2.8vw, 40px)` | 1.3 | |

Fallbacks: Archer Pro → Arvo → Georgia; Barlow → system-ui. Font files live in the design project's `uploads/` (Archer Pro is licensed — confirm the web license before shipping; use `next/font/local`).

Headline pattern: one plain clause + one short italic accent phrase. e.g. *"Hand-shaped bread, **baked fresh** every morning."*

### Spacing & layout

| Token | Value |
|---|---|
| Container max width | 1280px |
| Narrow (centered text) | 760px |
| Side gutter | `clamp(20px, 5vw, 72px)` |
| Section padding (y) | `clamp(88px, 11vw, 168px)` |
| Small section padding (y) | `clamp(56px, 7vw, 104px)` |
| Card grid gaps | 32–40px horizontal, 48–64px vertical |
| Header height | 84px, sticky |

Generous spacing is the point — err toward more, not less.

### Components

- **Buttons:** pill (`border-radius: 999px`), 14×26px padding, Barlow 500 15px. Variants: `primary` (accent bg, cream text), `ink` (ink bg), `quiet` (transparent, `#CDBFA8` 1px border → ink on hover).
- **Text link:** Barlow 500 15px, 1px underline, `→` arrow that nudges 3px on hover, turns accent on hover.
- **Photo:** rectangle, 4px radius, `photo` background while loading, image fades in. Card hover = image scales to 1.035 over ~1.1s. Fixed aspect ratios (see below).
- **Inputs:** white (cream on white sections), 1px `line` border, 4px radius, 14×16px padding. Labels are Barlow Condensed uppercase `ink-3`.
- **Hairline lists:** steps, values, roles, hours — each row separated by a 1px `line` top border. Numbers, when used, are Archer italic in accent ("1.", "2.").
- **Reveal:** fade + 14px rise on scroll into view, 0.9s, staggered 60–120ms. Respect `prefers-reduced-motion`.

### Photo aspect ratios used

| Ratio | Where |
|---|---|
| 5:4 | Page heroes (split layout) |
| 21:9 | Wide story band (Home, Our Story) |
| 4:5 | Featured items, packages, perks/September images |
| 4:3 | Menu items, journal cards, featured journal |
| 3:2 | Two-up panels (order/catering, giving/careers) |
| 1:1 | Home menu-category tiles |

Use Sanity image hotspot/crop so editors can control framing per ratio.

---

## 4. Global shell

- **Announcement bar:** one centered line on `wash`, 13px, with an inline link. CMS-editable text + link. No marquee.
- **Header:** logo left (38px tall), nav center (Menu, Catering, Our Story, Journal, Contact), right side "Rewards" link + primary "Order online" button. Active page = 1px accent underline offset 8px. On scroll: translucent cream + blur + bottom hairline. Mobile: "Menu" quiet button opens a stacked list.
- **Footer:** `wash` background, hairline top. Left: logo, italic line "From our hearth to your table.", email signup (pill input + ink button). Right: three link columns (Order / Company / Help) with Barlow Condensed headings. Bottom row: © + Privacy, Terms, social.

---

## 5. Page-by-page sections

Sections alternate cream → white → cream. Prototype file for each page: `prototype/<page>/sections-v3.jsx`.

### Home (`home/sections-v3.jsx`)
1. **Hero** — split 5/7: eyebrow "Bakery & Café · Since 1997", H1, lede, primary CTA + text link; 5:4 photo right.
2. **Fresh this season** (white) — intro + "See the full menu" link; 3 featured items (4:5 photo, name + price on one line, one-line description).
3. **Explore the menu** — centered intro; 4 square category tiles linking to menu anchors.
4. **Story moment** (white) — 21:9 photo; below: founders' pull quote left, short story paragraph + link right.
5. **Two ways** — two 3:2 photo panels: Order ahead / Catering, each with eyebrow, H2-sized title, copy, link.
6. **Journal** (white) — intro + "All stories"; 3 latest posts (4:3 photo, meta, title).
7. **Rewards** — centered small section: eyebrow, H2 with accent, lede, ink button.

### Menu (`menu/sections-v3.jsx`)
1. **Intro** — centered: eyebrow, H1, lede, "Start an order" + "Nutrition & allergens" link.
2. **Sticky category rail** — below header (top: 84px), hairlines top and bottom, text links with small category color dots; horizontal scroll on mobile, centered on desktop.
3. **Category sections** — 3/9 split: left column sticky (category name H2 + description); right is a 3-col grid of item cards: 4:3 photo, name + price, description, meta line (`640 cal · egg · gluten · dairy`, lowercase). Categories separated by a hairline.
4. **Catering closer** (white) — 3:2 photo + "Ordering for a group?" with link.

### Catering (`catering/sections-v3.jsx`)
1. **Hero** — split, CTAs "Start an inquiry" (→ #inquire) and "View packages" (→ #packages).
2. **Packages** (white) — centered intro; 4 cards: 4:5 photo, tier eyebrow, title, price range, hairline, includes list, minimum.
3. **How it works** — intro left (lede lists occasions from use-cases), 2×2 numbered steps right.
4. **Inquiry** (white) — contact info left; form right (name, email, date, guests, notes).

### Our Story (`story/sections-v3.jsx`)
1. **Hero** — centered text, then full-width 21:9 photo.
2. **Origin** — intro + lede left; hairline timeline right (italic accent years).
3. **Numbers** (white) — 4 centered stats in Archer Light.
4. **Leadership** — 3 columns: 4:5 portrait (initials placeholder if no photo), name, role eyebrow, bio.
5. **Values** (white) — intro left, 2×2 hairline values right.
6. **Doors** — two 3:2 photo panels → Giving, Careers.

### Journal (`journal/sections-v3.jsx`)
1. **Intro** — centered, with tag filter as text buttons (All / Story / Recipe / Field / How-to).
2. **Featured** — latest post in filter: 7/5 split, 4:3 photo, meta, H2, excerpt, author, link.
3. **Grid** (white) — remaining posts, 3 columns, excerpt clamped to 2 lines.
4. **Newsletter** — centered, pill input + primary button.

### Contact (`contact/sections-v3.jsx`)
1. **Intro** — centered.
2. **Four contacts** — hairline columns: title, description, email link, phone.
3. **Form + hours** (white) — left: heading, 4:3 photo, hours as hairline rows; right: form (name, email, topic select, message).

### Careers (`careers/sections-v3.jsx`)
1. **Hero** — split.
2. **Roles** (white) — hairline rows: role / description / tag / "Apply →".
3. **Perks** — 4:5 photo left, three hairline perks right.

### Giving (`giving/sections-v3.jsx`)
1. **Hero** — split.
2. **Pillars** (white) — centered intro, three numbered hairline columns.
3. **September** — 4:5 photo left; intro + three ways to help + "Partner with us".

---

## 6. Content & Sanity

- `prototype/shared/data.js` is **placeholder content only**. All real content continues to come from Sanity. Do not import it.
- Contact details in the prototype (`@kneaders.com` emails, `555` phone numbers) are placeholders.
- Stock photos in the prototype are Unsplash stand-ins. Production uses Sanity image assets via `next/image` with proper `sizes`.
- **First task in Claude Code:** read the existing Sanity schemas and page builder blocks, then produce a mapping table: *v3 section → existing block (reuse / restyle) or new block/field needed*. Prefer restyling existing blocks over new schemas. Get that mapping reviewed before building.
- Likely schema touches (verify against the real schemas): announcement bar text/link, headline accent phrase (or allow italic marks in a short Portable Text headline), image hotspot on all photo fields, featured-items reference list for Home, use-cases list for Catering.

---

## 7. Suggested build order

1. Branch `design/v3`. Plan mode first: read repo, schemas, this brief, and the prototype; return the section→block mapping and a component plan.
2. Tokens into Tailwind config + fonts via `next/font/local`.
3. Shared shell: announcement bar, header, footer, Photo, Button, TextLink, Eyebrow, Reveal.
4. Home → review → Menu → Catering → Our Story → Journal → Contact → Careers → Giving.
5. Preview deployment with Sanity draft content for client testing alongside the current site.

## 8. Acceptance checklist

- [ ] No colored full-bleed sections; only cream / white / tan wash.
- [ ] No all-caps display headlines; H1 max 64px.
- [ ] Every page leads with a photo or a quiet centered intro — nothing louder than the photography.
- [ ] Brick red appears only on buttons, accent italics, and the active nav underline.
- [ ] Sections use the spacing tokens; nothing feels cramped at 1280px or 375px.
- [ ] No horizontal scroll at 375px; category rail scrolls on its own.
- [ ] Reveal and hover motion disabled under `prefers-reduced-motion`.
- [ ] All images have alt text from Sanity; hotspots respected at each ratio.
- [ ] Lighthouse accessibility ≥ 95; contrast checked for `ink-3` meta text on white.
