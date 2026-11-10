import type { ColorCard, ColorCardGridSection, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Intro } from "../ui/intro";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";

/**
 * A set of short entries separated by hairlines. The content picks the arrangement:
 *  - columns: contact "doors" (cards with an email or phone) and numbered
 *    pillars, or any set of three or fewer
 *  - rows: everything else, e.g. careers roles — title / description / tag / link
 */
export function ColorCardGrid({
  anchorId,
  heading,
  numbered,
  cards = [],
  surface,
}: Keyed<ColorCardGridSection> & { surface?: Surface }) {
  const hasContact = cards.some((c) => c.email || c.phone);
  const rows = !numbered && !hasContact && cards.length > 3;
  // Card titles sit under the section heading when there is one.
  const Title = heading ? "h3" : "h2";
  return (
    <Section id={anchorId} block="colorCardGrid" surface={surface} className="scroll-mt-[90px]">
      <Container>
        {heading && (
          <Reveal className="mb-14">
            <Intro align={rows ? "left" : "center"} title={heading} />
          </Reveal>
        )}
        {rows ? (
          <ul className="flex flex-col border-b border-k-line">
            {cards.map((c, i) => (
              <Reveal
                as="li"
                key={c._key}
                delay={i * 60}
                className="group/card relative grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t border-k-line py-7"
              >
                <Title className="type-h3 col-span-12 md:col-span-4">{c.title}</Title>
                {c.body && <p className="type-body col-span-12 md:col-span-5">{c.body}</p>}
                {c.sticker && <span className="type-meta col-span-6 md:col-span-2">{c.sticker}</span>}
                {c.cta && (
                  <TextLink href={c.cta.href} stretched className="col-span-6 col-start-7 justify-self-end text-sm md:col-span-1 md:col-start-12">
                    {c.cta.label}
                    <span className="sr-only">: {c.title}</span>
                  </TextLink>
                )}
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul
            className={`grid grid-cols-1 gap-y-12 ${
              cards.length === 3 ? "gap-x-12 md:grid-cols-3" : "gap-x-10 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {cards.map((c, i) => (
              <Reveal as="li" key={c._key} delay={i * 70} className="flex flex-col gap-3 border-t border-k-line pt-6">
                {numbered && <span className="type-numeral">{i + 1}.</span>}
                <Title className={cards.length === 3 ? "type-h3" : "type-h4"}>{c.title}</Title>
                {c.body && <p className={cards.length === 3 ? "type-body" : "type-small"}>{c.body}</p>}
                <CardLinks card={c} />
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

function CardLinks({ card }: { card: ColorCard }) {
  if (!card.email && !card.phone && !card.cta) return null;
  return (
    <div className="mt-3 flex flex-col items-start gap-2">
      {card.email && (
        <TextLink href={`mailto:${card.email}`} arrow={false} className="text-sm">
          {card.email}
        </TextLink>
      )}
      {card.phone && (
        <a
          href={`tel:${card.phone.replace(/[^\d+]/g, "")}`}
          className="type-small text-k-ink-3 transition-colors duration-200 hover:text-k-ink"
        >
          {card.phone}
        </a>
      )}
      {card.cta && (
        <TextLink href={card.cta.href} className="text-sm">
          {card.cta.label}
        </TextLink>
      )}
    </div>
  );
}
