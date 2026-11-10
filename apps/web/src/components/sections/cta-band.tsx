import type { CtaBandSection, Keyed } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Headline } from "../ui/headline";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";

/** Closing call to action (menu, story): a centered heading and up to two buttons. */
export function CtaBand({
  headline,
  primaryCta,
  secondaryCta,
  secondaryStyle = "solid",
  surface,
}: Keyed<CtaBandSection> & { surface?: Surface }) {
  return (
    <Section block="ctaBand" surface={surface} size="small">
      <Container narrow>
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <h2 className="type-h2">
            <Headline headline={headline} />
          </h2>
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap justify-center gap-3">
              {primaryCta && <Button href={primaryCta.href}>{primaryCta.label}</Button>}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant={secondaryStyle === "outline" ? "quiet" : "ink"}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
