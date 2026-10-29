import type { Keyed, ValuesGridSection } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { RuledHeading } from "../ui/ruled-heading";

const CYCLE = ["brown", "sage"] as const;

/** Numbered value cards; each number takes the card's accent color. */
export function ValuesGrid({ heading, values }: Keyed<ValuesGridSection>) {
  return (
    <section data-cms-block="valuesGrid" className="bg-k-cream pt-20 pb-[88px]">
      <Container>
        <RuledHeading>{heading}</RuledHeading>
        <div className="grid grid-cols-12 gap-6">
          {values?.map((v, i) => (
            <Lift
              key={v._key}
              y={-6}
              className="col-span-12 flex flex-col gap-3 rounded-[20px] bg-k-tan p-6 sm:col-span-6 lg:col-span-3"
              style={toneVars({ accent: hex(v.tone ?? CYCLE[i % CYCLE.length], "brown") })}
            >
              <span className="font-headline text-[34px] tracking-[-0.01em] text-(--accent)">{v.number}</span>
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-k-black">{v.title}</h3>
              <p className="font-body text-sm leading-normal text-pretty text-k-ink-2">{v.body}</p>
            </Lift>
          ))}
        </div>
      </Container>
    </section>
  );
}
