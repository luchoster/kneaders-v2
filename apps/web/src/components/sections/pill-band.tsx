import type { Keyed, PillBandSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";

/** A calm, centered callout (home "Rewards"): eyebrow, heading, one line of copy, one button. */
export function PillBand({ kicker, title, body, cta, surface }: Keyed<PillBandSection> & { surface?: Surface }) {
  return (
    <Section block="pillBand" surface={surface} size="small">
      <Container narrow>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          {kicker && <Eyebrow>{kicker}</Eyebrow>}
          <h2 className="type-h2">{title}</h2>
          {body && <p className="type-lede max-w-[520px]">{body}</p>}
          {cta && (
            <Button href={cta.href} variant="ink">
              {cta.label}
            </Button>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
