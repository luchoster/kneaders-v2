import type { Keyed, TicketFeatureSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Headline } from "../ui/headline";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { Steps } from "../ui/steps";

/**
 * A copy block beside a hairline list (catering "how it works", careers perks,
 * the story timeline, the giving fundraiser). `ticketPosition` picks the side
 * the list sits on.
 */
export function TicketFeature({
  ticketPosition = "right",
  eyebrow,
  headline,
  paragraphs,
  quote,
  chips,
  cta,
  ticket,
  surface,
}: Keyed<TicketFeatureSection> & { surface?: Surface }) {
  const left = ticketPosition === "left";
  return (
    <Section block="ticketFeature" surface={surface}>
      <Container className="grid grid-cols-12 gap-y-14 md:gap-x-16">
        <Reveal
          className={`col-span-12 flex flex-col items-start gap-6 md:col-span-5 ${left ? "md:order-2 md:col-start-8" : ""}`}
        >
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="type-h2">
            <Headline headline={headline} />
          </h2>
          {paragraphs?.map((p) => (
            <p key={p} className="type-lede">
              {p}
            </p>
          ))}
          {quote && <p className="type-quote text-[clamp(22px,2vw,28px)]">{quote}</p>}
          {chips && chips.length > 0 && <p className="type-meta">{chips.join(" · ")}</p>}
          {cta && (
            <Button href={cta.href} className="mt-2">
              {cta.label}
            </Button>
          )}
        </Reveal>
        <Steps
          ticket={ticket}
          className={`col-span-12 md:col-span-6 ${left ? "md:order-1" : "md:col-start-7"}`}
        />
      </Container>
    </Section>
  );
}
