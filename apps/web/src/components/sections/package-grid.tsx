import type { Keyed, PackageGridSection, Tone } from "@kneaders/content";
import { palette } from "@kneaders/content";
import { inkOnField, toneVars } from "@/lib/tones";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { Plate } from "../ui/plate";
import { RuledHeading } from "../ui/ruled-heading";
import { SmartLink } from "../ui/smart-link";

const CYCLE: Tone[] = ["gold", "sage", "red", "blue"];

/** Catering packages — color-blocked cards with plate, inclusions, and minimums. */
export function PackageGrid({ anchorId, heading, headingTone = "brown", packages, inquireHref = "#inquire" }: Keyed<PackageGridSection>) {
  return (
    <section id={anchorId} data-cms-block="packageGrid" className="scroll-mt-[90px] bg-k-tan pt-20 pb-[88px]">
      <Container>
        <RuledHeading tone={headingTone}>{heading}</RuledHeading>
        <div className="grid grid-cols-12 items-start gap-6">
          {packages?.map((p, i) => {
            const tone = p.tone ?? CYCLE[i % CYCLE.length];
            const ink = palette[inkOnField(tone)];
            return (
              <Lift
                key={p._key}
                y={-6}
                className="relative col-span-12 flex flex-col gap-4 rounded-3xl bg-(--field) p-5 sm:col-span-6 lg:col-span-3"
                style={toneVars({ field: palette[tone], ink, rule: `${ink}55` })}
              >
                <div className="mx-auto -mt-1 w-[78%]">
                  <Plate media={p.image} alt="" disc="rgba(35,31,32,0.22)" sizes="280px" />
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-(--ink) opacity-85">
                    {p.tier}
                  </span>
                  <span className="font-condensed text-xs text-(--ink) opacity-85">{p.priceRange}</span>
                </div>
                <h3 className="font-headline text-[26px] uppercase leading-none tracking-[-0.01em] text-(--ink)">{p.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {p.includes.map((it) => (
                    <li key={it} className="flex items-start gap-2 font-body text-sm leading-[1.4] text-(--ink) opacity-94">
                      <span aria-hidden className="font-bold">·</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t border-dashed border-(--rule) pt-2">
                  <span className="font-condensed text-[11px] uppercase tracking-[0.12em] text-(--ink) opacity-80">{p.minimum}</span>
                  <SmartLink
                    href={inquireHref}
                    className="font-condensed text-xs font-bold uppercase tracking-[0.14em] text-(--ink) underline underline-offset-[3px]"
                  >
                    Inquire →
                  </SmartLink>
                </div>
              </Lift>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
