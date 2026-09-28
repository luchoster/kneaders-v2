import type { KeyedSection } from "@kneaders/content";
import { CategoryField } from "./category-field";
import { ColorBlocks } from "./color-blocks";
import { ColorCardGrid } from "./color-card-grid";
import { CtaBand } from "./cta-band";
import { DifferenceBand } from "./difference-band";
import { FeaturedPost } from "./featured-post";
import { FormSection } from "./form-section";
import { JournalStrip } from "./journal-strip";
import { MenuBoard } from "./menu-board";
import { MenuHero } from "./menu-hero";
import { NewsletterBand } from "./newsletter-band";
import { PackageGrid } from "./package-grid";
import { PageHero } from "./page-hero";
import { PillBand } from "./pill-band";
import { PostGrid } from "./post-grid";
import { PromoCarousel } from "./promo-carousel";
import { TeamGrid } from "./team-grid";
import { TicketFeature } from "./ticket-feature";
import { ValuesGrid } from "./values-grid";

/** Renders a page's `sections[]` — one component per Sanity section object. */
export function PageBuilder({ sections }: { sections: KeyedSection[] | null | undefined }) {
  if (!Array.isArray(sections)) return null;
  return (
    <>
      {sections.map((s) => {
        switch (s._type) {
          case "promoCarousel":
            return <PromoCarousel key={s._key} {...s} />;
          case "pillBand":
            return <PillBand key={s._key} {...s} />;
          case "categoryField":
            return <CategoryField key={s._key} {...s} />;
          case "colorBlocks":
            return <ColorBlocks key={s._key} {...s} />;
          case "differenceBand":
            return <DifferenceBand key={s._key} {...s} />;
          case "journalStrip":
            return <JournalStrip key={s._key} {...s} />;
          case "menuHero":
            return <MenuHero key={s._key} {...s} />;
          case "menuBoard":
            return <MenuBoard key={s._key} {...s} />;
          case "ctaBand":
            return <CtaBand key={s._key} {...s} />;
          case "pageHero":
            return <PageHero key={s._key} {...s} />;
          case "packageGrid":
            return <PackageGrid key={s._key} {...s} />;
          case "ticketFeature":
            return <TicketFeature key={s._key} {...s} />;
          case "formSection":
            return <FormSection key={s._key} {...s} />;
          case "teamGrid":
            return <TeamGrid key={s._key} {...s} />;
          case "valuesGrid":
            return <ValuesGrid key={s._key} {...s} />;
          case "featuredPost":
            return <FeaturedPost key={s._key} {...s} />;
          case "postGrid":
            return <PostGrid key={s._key} {...s} />;
          case "newsletterBand":
            return <NewsletterBand key={s._key} {...s} />;
          case "colorCardGrid":
            return <ColorCardGrid key={s._key} {...s} />;
          default: {
            const unknown = s as { _type: string; _key: string };
            if (process.env.NODE_ENV !== "production") {
              return (
                <div key={unknown._key} className="bg-k-tan p-6 text-center font-condensed text-sm uppercase">
                  Missing component for section “{unknown._type}”
                </div>
              );
            }
            return null;
          }
        }
      })}
    </>
  );
}
