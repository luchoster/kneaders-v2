import type { DifferenceBandSection, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Headline } from "../ui/headline";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";
import { ValueList } from "../ui/value-list";

/** Story moment — one wide photograph, then the headline beside a 2×2 of values. */
export function DifferenceBand({
  headline,
  image,
  values,
  cta,
  surface,
}: Keyed<DifferenceBandSection> & { surface?: Surface }) {
  return (
    <Section block="differenceBand" surface={surface}>
      <Container>
        <Reveal>
          <Photo media={image} ratio="21/9" className="max-md:aspect-[3/2]" sizes="(min-width: 1280px) 1136px, 90vw" />
        </Reveal>
        <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-12 gap-y-12 md:gap-x-16">
          <div className="col-span-12 flex flex-col items-start gap-6 md:col-span-4">
            <h2 className="type-h2">
              <Headline headline={headline} />
            </h2>
            {cta && <TextLink href={cta.href}>{cta.label}</TextLink>}
          </div>
          {values?.length > 0 && <ValueList values={values} className="col-span-12 md:col-span-7 md:col-start-6" />}
        </div>
      </Container>
    </Section>
  );
}
