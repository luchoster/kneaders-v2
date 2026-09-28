import { categoryField } from "./category-field";
import { colorBlocks } from "./color-blocks";
import { colorCardGrid } from "./color-card-grid";
import { ctaBand } from "./cta-band";
import { differenceBand } from "./difference-band";
import { featuredPost } from "./featured-post";
import { formSection } from "./form-section";
import { journalStrip } from "./journal-strip";
import { menuBoard } from "./menu-board";
import { menuHero } from "./menu-hero";
import { newsletterBand } from "./newsletter-band";
import { packageGrid } from "./package-grid";
import { pageHero } from "./page-hero";
import { pillBand } from "./pill-band";
import { postGrid } from "./post-grid";
import { promoCarousel } from "./promo-carousel";
import { teamGrid } from "./team-grid";
import { ticketFeature } from "./ticket-feature";
import { valuesGrid } from "./values-grid";

/** Every page-builder section. Each maps 1:1 to a React component in apps/web/src/components/sections. */
export const sectionTypes = [
  pageHero,
  promoCarousel,
  pillBand,
  categoryField,
  colorBlocks,
  differenceBand,
  journalStrip,
  menuHero,
  menuBoard,
  ctaBand,
  packageGrid,
  ticketFeature,
  formSection,
  teamGrid,
  valuesGrid,
  featuredPost,
  postGrid,
  newsletterBand,
  colorCardGrid,
];
