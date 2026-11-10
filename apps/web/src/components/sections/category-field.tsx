import type { CategoryFieldSection, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Intro } from "../ui/intro";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { SmartLink } from "../ui/smart-link";
import { TextLink } from "../ui/text-link";

/** Explore the menu — a centered intro over square photo tiles, one per menu category. */
export function CategoryField({ tiles, tagline, cta, surface }: Keyed<CategoryFieldSection> & { surface?: Surface }) {
  return (
    <Section block="categoryField" surface={surface}>
      <Container>
        {(tagline || cta) && (
          <Reveal className="mb-14">
            {tagline ? (
              <Intro align="center" title={tagline} action={cta && <TextLink href={cta.href}>{cta.label}</TextLink>} />
            ) : (
              cta && (
                <div className="text-center">
                  <TextLink href={cta.href}>{cta.label}</TextLink>
                </div>
              )
            )}
          </Reveal>
        )}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {tiles?.map((c, i) => (
            <Reveal as="li" key={c._key} delay={(i % 4) * 70} className="group/card relative flex flex-col gap-4">
              {/* The label next to it names the tile, so the photo is decorative. */}
              <Photo media={c.image} alt="" ratio="1/1" sizes="(min-width: 1280px) 290px, (min-width: 768px) 22vw, 45vw" />
              <SmartLink
                href={`/menu#${c.category}`}
                className="type-h4 flex items-center gap-2 after:absolute after:inset-0 after:content-['']"
              >
                {c.label}
                <span
                  aria-hidden
                  className="text-[15px] text-k-ink-3 transition-transform duration-[250ms] group-hover/card:translate-x-[3px]"
                >
                  →
                </span>
              </SmartLink>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
