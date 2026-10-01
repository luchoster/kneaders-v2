/**
 * Content shapes shared by the Studio schema, the GROQ projections, and the
 * React section components. Everything here is stored as-is in Sanity; the
 * only things resolved at query time are the `posts` / `post` / `categories`
 * fields noted below.
 */
import type { Tone } from "./palette";

export type { Tone };

export type Keyed<T> = T & { _key: string };

/* ------------------------------------------------------------------ */
/* Shared objects                                                     */
/* ------------------------------------------------------------------ */

export interface SanityImageRef {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

/** Image that is either uploaded to Sanity or pulled from an external URL. */
export interface Media {
  _type?: "media";
  image?: SanityImageRef;
  externalUrl?: string;
  alt?: string;
}

export interface Cta {
  _type?: "cta";
  label: string;
  href: string;
}

/** A headline split in two so each half can carry its own brand tone. */
export interface SplitHeadline {
  _type?: "splitHeadline";
  lead: string;
  leadTone?: Tone;
  rest?: string;
  restTone?: Tone;
  /** Put `rest` on its own line. */
  stacked?: boolean;
}

export interface Sticker {
  _type?: "sticker";
  text: string;
  tone?: Tone;
  textTone?: Tone;
}

export interface TicketStep {
  marker: string;
  title: string;
  body?: string;
}

/** The bakery "order ticket" card used across pages. */
export interface Ticket {
  _type?: "ticket";
  title: string;
  tag?: string;
  number?: string;
  steps: Keyed<TicketStep>[];
  footer?: string;
}

export interface ValueItem {
  number: string;
  title: string;
  body: string;
  tone?: Tone;
}

/* ------------------------------------------------------------------ */
/* Documents                                                          */
/* ------------------------------------------------------------------ */

export interface Slug {
  _type: "slug";
  current: string;
}

export interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h3" | "blockquote" | "lede";
  markDefs: unknown[];
  children: PortableTextSpan[];
}

export interface PostDocument {
  _id: string;
  _type: "post";
  title: string;
  slug: Slug;
  tag: string;
  readTime: string;
  publishedAt: string; // YYYY-MM-DD
  author: string;
  authorRole?: string;
  excerpt: string;
  image: Media;
  body?: PortableTextBlock[];
}

/** Post shape after the GROQ projection (slug flattened). */
export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  readTime: string;
  publishedAt: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  image: Media;
}

export interface PostDetail extends PostCard {
  body?: PortableTextBlock[];
  related: PostCard[];
}

export interface MenuItem {
  name: string;
  price?: number | null;
  calories?: number | null;
  description?: PortableTextBlock[] | null;
  allergens?: string[] | null;
  pairsWith?: string[] | null;
  image?: Media | null;
  /** Per-item order link; falls back to the menu board's order button. */
  orderUrl?: string | null;
}

/** Bundled seed shape (items inline). In Sanity, items are separate `menuItem` documents. */
export interface MenuCategoryDocument {
  _id: string;
  _type: "menuCategory";
  title: string;
  slug: Slug;
  description?: string;
  tone?: Tone;
  orderRank: number;
  items: Keyed<SeedMenuItem>[];
}

/** Seed copy is written as plain strings; the web seed resolver converts it to Portable Text. */
export type SeedMenuItem = Omit<MenuItem, "description"> & { description: string };

export interface MenuCategory {
  _id: string;
  title: string;
  slug: string;
  description?: PortableTextBlock[] | null;
  /** Hero subtitle — shown when there's no description. */
  subtitle?: string | null;
  tone?: Tone;
  items: Keyed<MenuItem>[];
}

export interface NavLink {
  key: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: Keyed<Cta>[];
}

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  title: string;
  description?: string;
  announcements: string[];
  navLinks: Keyed<NavLink>[];
  rewardsLink?: Cta;
  orderCta: Cta;
  footer: {
    tagline: string[];
    newsletterHeading: string;
    newsletterBody: string;
    newsletterPlaceholder?: string;
    columns: Keyed<FooterColumn>[];
    copyright: string;
    legalLinks: Keyed<Cta>[];
  };
}

/* ------------------------------------------------------------------ */
/* Page-builder sections                                              */
/* ------------------------------------------------------------------ */

export interface PromoSlide {
  eyebrow?: string;
  headline: SplitHeadline;
  body?: string;
  cta?: Cta;
  image: Media;
  /** Menu category slug — drives the plate color (style-guide color-coding). */
  category?: string;
  sticker?: Sticker;
}

export interface PromoCarouselSection {
  _type: "promoCarousel";
  slides: Keyed<PromoSlide>[];
  intervalSeconds?: number;
}

export interface PillBandSection {
  _type: "pillBand";
  kicker?: string;
  title: string;
  body?: string;
  cta?: Cta;
  sticker?: Sticker;
}

export interface CategoryTile {
  label: string;
  category: string;
  image: Media;
}

export interface CategoryFieldSection {
  _type: "categoryField";
  tiles: Keyed<CategoryTile>[];
  tagline?: string;
  cta?: Cta;
}

export interface ColorBlock {
  title: string;
  body?: string;
  cta?: Cta;
  tone: Tone;
  textTone?: Tone;
  image?: Media;
  sticker?: Sticker;
}

export interface ColorBlocksSection {
  _type: "colorBlocks";
  blocks: Keyed<ColorBlock>[];
  /** Tuck the blocks up under the previous section (no top padding). */
  tuckUnder?: boolean;
}

export interface DifferenceBandSection {
  _type: "differenceBand";
  headline: SplitHeadline;
  image: Media;
  sticker?: Sticker;
  values: Keyed<ValueItem>[];
  cta?: Cta;
}

export interface JournalStripSection {
  _type: "journalStrip";
  headline: SplitHeadline;
  cta?: Cta;
  limit?: number;
  /** Resolved at query time. */
  posts?: PostCard[];
}

export interface MenuHeroSection {
  _type: "menuHero";
  headline: SplitHeadline;
  bullets?: string[];
  featured: {
    kicker?: string;
    title: string;
    image: Media;
    tone?: Tone;
    sticker?: Sticker;
  };
  ticket?: Ticket;
}

export interface MenuBoardSection {
  _type: "menuBoard";
  orderCta?: Cta;
  /** Resolved at query time. */
  categories?: MenuCategory[];
}

export interface CtaBandSection {
  _type: "ctaBand";
  headline: SplitHeadline;
  size?: "large" | "medium";
  tone?: Tone;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  secondaryStyle?: "solid" | "outline";
}

export interface HeroButton extends Cta {
  style?: "solid" | "outline";
  tone?: Tone;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface PageHeroSection {
  _type: "pageHero";
  theme?: "light" | "dark";
  layout?: "textOnly" | "balanced" | "wide";
  size?: "large" | "medium";
  eyebrow?: string;
  headline: SplitHeadline;
  body?: string;
  buttons?: Keyed<HeroButton>[];
  image?: Media;
  plateTone?: Tone;
  sticker?: Sticker;
  stats?: Keyed<HeroStat>[];
  /** Tag chips (e.g. journal categories). */
  tags?: string[];
}

export interface CateringPackage {
  tier: string;
  priceRange: string;
  minimum: string;
  title: string;
  includes: string[];
  image: Media;
  tone?: Tone;
}

export interface PackageGridSection {
  _type: "packageGrid";
  anchorId?: string;
  heading: string;
  headingTone?: Tone;
  packages: Keyed<CateringPackage>[];
  inquireHref?: string;
}

export interface TicketFeatureSection {
  _type: "ticketFeature";
  theme?: "light" | "dark";
  ticketPosition?: "left" | "right";
  eyebrow?: string;
  headline: SplitHeadline;
  paragraphs?: string[];
  quote?: string;
  chips?: string[];
  cta?: Cta;
  ticket: Ticket;
}

export interface FormField {
  name: string;
  label: string;
  kind: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select";
  placeholder?: string;
  width?: "half" | "full";
  options?: string[];
  rows?: number;
  min?: number;
  required?: boolean;
}

export interface FormSection {
  _type: "formSection";
  anchorId?: string;
  background?: "tan" | "cream";
  formId: string;
  headline: SplitHeadline;
  body?: string;
  contactLine?: string;
  ticket?: Ticket;
  fields: Keyed<FormField>[];
  submitLabel: string;
  submitTone?: Tone;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: Media;
  tone?: Tone;
}

export interface TeamGridSection {
  _type: "teamGrid";
  heading: string;
  members: Keyed<TeamMember>[];
}

export interface ValuesGridSection {
  _type: "valuesGrid";
  heading: string;
  values: Keyed<ValueItem>[];
}

export interface FeaturedPostSection {
  _type: "featuredPost";
  sticker?: Sticker;
  ctaLabel?: string;
  /** Optional pinned post; falls back to the latest. Resolved at query time. */
  post?: PostCard | null;
}

export interface PostGridSection {
  _type: "postGrid";
  heading: string;
  /** Skip the N most recent posts (e.g. the one featured above). */
  offset?: number;
  posts?: PostCard[];
}

export interface NewsletterBandSection {
  _type: "newsletterBand";
  headline: SplitHeadline;
  body?: string;
  placeholder?: string;
  buttonLabel?: string;
}

export interface ColorCard {
  title: string;
  body?: string;
  tone: Tone;
  textTone?: Tone;
  sticker?: string;
  email?: string;
  phone?: string;
  cta?: Cta;
}

export interface ColorCardGridSection {
  _type: "colorCardGrid";
  anchorId?: string;
  heading?: string;
  numbered?: boolean;
  cards: Keyed<ColorCard>[];
}

export type Section =
  | PromoCarouselSection
  | PillBandSection
  | CategoryFieldSection
  | ColorBlocksSection
  | DifferenceBandSection
  | JournalStripSection
  | MenuHeroSection
  | MenuBoardSection
  | CtaBandSection
  | PageHeroSection
  | PackageGridSection
  | TicketFeatureSection
  | FormSection
  | TeamGridSection
  | ValuesGridSection
  | FeaturedPostSection
  | PostGridSection
  | NewsletterBandSection
  | ColorCardGridSection;

export type SectionType = Section["_type"];

export type KeyedSection = Keyed<Section>;

export interface PageDocument {
  _id: string;
  _type: "page";
  title: string;
  slug: Slug;
  /** Which primary-nav item is highlighted on this page. */
  navKey?: string;
  seo?: { title?: string; description?: string };
  sections: KeyedSection[];
}

/** Singleton (ID `homePage`) rendered at `/`. */
export interface HomePageDocument {
  _id: "homePage";
  _type: "homePage";
  title: string;
  seo?: { title?: string; description?: string };
  sections: KeyedSection[];
}

export interface Page {
  _id: string;
  title: string;
  slug: string;
  navKey?: string;
  seo?: { title?: string; description?: string };
  sections: KeyedSection[];
}
