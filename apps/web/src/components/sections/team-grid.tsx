import type { Keyed, TeamGridSection, Tone } from "@kneaders/content";
import { palette } from "@kneaders/content";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { Plate } from "../ui/plate";
import { RuledHeading } from "../ui/ruled-heading";

const CYCLE: Tone[] = ["gold", "sage", "blue", "red"];

/** People bios (exec team, founders) — squircle headshot on a colored plate. */
export function TeamGrid({ heading, members }: Keyed<TeamGridSection>) {
  return (
    <section data-cms-block="teamGrid" className="bg-k-tan pt-20 pb-[88px]">
      <Container>
        <RuledHeading>{heading}</RuledHeading>
        <div className="grid grid-cols-12 items-start gap-6">
          {members?.map((m, i) => {
            const color = palette[m.tone ?? CYCLE[i % CYCLE.length]];
            return (
              <Lift
                key={m._key}
                y={-6}
                className="col-span-12 flex flex-col gap-4 rounded-[20px] border border-k-line bg-k-cream p-5 md:col-span-4"
              >
                <div className="mx-auto w-[64%]">
                  <Plate media={m.photo} alt="" disc={color} sizes="260px" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h3 className="font-headline text-[22px] uppercase leading-[1.05] tracking-[-0.01em] text-k-black">{m.name}</h3>
                  <span className="font-condensed text-xs font-semibold uppercase tracking-[0.18em]" style={{ color }}>
                    {m.role}
                  </span>
                </div>
                <p className="font-body text-sm leading-[1.55] text-pretty text-k-maroon">{m.bio}</p>
              </Lift>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
