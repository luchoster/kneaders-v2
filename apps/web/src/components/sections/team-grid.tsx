import type { Keyed, TeamGridSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { Photo } from "../ui/photo";
import { RuledHeading } from "../ui/ruled-heading";

/** People bios (exec team, founders) — headshot, name, role, bio. */
export function TeamGrid({ heading, members }: Keyed<TeamGridSection>) {
  return (
    <section data-cms-block="teamGrid" className="bg-k-tan pt-20 pb-[88px]">
      <Container>
        <RuledHeading>{heading}</RuledHeading>
        <div className="grid grid-cols-12 items-start gap-6">
          {members?.map((m) => {
            return (
              <Lift
                key={m._key}
                y={-6}
                className="col-span-12 flex flex-col gap-4 rounded-[20px] border border-k-line bg-k-cream p-5 md:col-span-4"
              >
                <div className="mx-auto w-[64%]">
                  <Photo media={m.photo} alt="" sizes="260px" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h3 className="font-headline text-[22px] uppercase leading-[1.05] tracking-[-0.01em] text-k-black">{m.name}</h3>
                  <span className="font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-k-brown">
                    {m.role}
                  </span>
                </div>
                <p className="font-body text-sm leading-[1.55] text-pretty text-k-ink-2">{m.bio}</p>
              </Lift>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
