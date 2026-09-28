import type { Keyed, Tone, ValuesGridSection } from "@kneaders/content";
import { palette } from "@kneaders/content";
import { toneVars } from "@/lib/tones";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { RuledHeading } from "../ui/ruled-heading";

const CYCLE: Tone[] = ["gold", "sage", "blue", "red"];

/** Numbered value cards with a colored top rule. */
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
              rotate={i % 2 ? 0.8 : -0.8}
              className="col-span-12 flex flex-col gap-3 rounded-[20px] border-t-[6px] border-(--accent) bg-k-tan p-6 sm:col-span-6 lg:col-span-3"
              style={toneVars({ accent: palette[v.tone ?? CYCLE[i % CYCLE.length]] })}
            >
              <span className="font-headline text-[34px] tracking-[-0.01em] text-(--accent)">{v.number}</span>
              <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-k-black">{v.title}</h3>
              <p className="font-body text-sm leading-normal text-pretty text-k-maroon">{v.body}</p>
            </Lift>
          ))}
        </div>
      </Container>
    </section>
  );
}
