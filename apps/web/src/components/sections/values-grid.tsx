import type { Keyed, ValuesGridSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Intro } from "../ui/intro";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { ValueList } from "../ui/value-list";

/** Values — the heading on the left, a 2×2 of hairline entries on the right. */
export function ValuesGrid({ heading, values, surface }: Keyed<ValuesGridSection> & { surface?: Surface }) {
  return (
    <Section block="valuesGrid" surface={surface}>
      <Container className="grid grid-cols-12 gap-y-12 md:gap-x-16">
        <Reveal className="col-span-12 md:col-span-4">
          <Intro title={heading} />
        </Reveal>
        {values?.length > 0 && <ValueList values={values} className="col-span-12 md:col-span-7 md:col-start-6" />}
      </Container>
    </Section>
  );
}
