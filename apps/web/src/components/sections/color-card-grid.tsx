import type { ColorCardGridSection, Keyed } from "@kneaders/content";
import { palette } from "@kneaders/content";
import { toneVars } from "@/lib/tones";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { RuledHeading } from "../ui/ruled-heading";
import { SmartLink } from "../ui/smart-link";
import { Sticker } from "../ui/sticker";

/**
 * Grid of saturated cards — contact "doors", careers roles, giving pillars.
 * Four-up by default; three cards switch to the roomier three-up layout.
 */
export function ColorCardGrid({ anchorId, heading, numbered, cards = [] }: Keyed<ColorCardGridSection>) {
  const threeUp = cards.length === 3;
  const hasContact = cards.some((c) => c.email || c.phone);
  return (
    <section
      id={anchorId}
      data-cms-block="colorCardGrid"
      className={`scroll-mt-[90px] bg-k-tan ${heading ? "pt-20 pb-[88px]" : "pt-[72px] pb-20"}`}
    >
      <Container>
        {heading && <RuledHeading>{heading}</RuledHeading>}
        <div className={`grid grid-cols-12 gap-6 ${hasContact ? "items-start" : ""}`}>
          {cards.map((c, i) => (
            <Lift
              key={c._key}
              y={-6}
              rotate={i % 2 ? 0.8 : -0.8}
              className={`relative col-span-12 flex flex-col gap-3 rounded-3xl bg-(--field) ${
                threeUp
                  ? "min-h-[200px] p-[clamp(24px,3vw,40px)] md:col-span-4"
                  : `p-6 sm:col-span-6 lg:col-span-3 ${hasContact ? "min-h-[220px]" : "min-h-[190px]"}`
              }`}
              style={toneVars({
                field: palette[c.tone],
                ink: palette[c.textTone ?? "cream"],
                rule: `${palette[c.textTone ?? "cream"]}55`,
              })}
            >
              {c.sticker && (
                <div className="absolute -top-3 right-3.5">
                  <Sticker tone="black" textTone="tan" rotate={5} size="xs">
                    {c.sticker}
                  </Sticker>
                </div>
              )}
              {numbered && (
                <span className="font-headline text-[34px] tracking-[-0.01em] text-(--ink) opacity-90">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className="font-headline text-2xl uppercase leading-none tracking-[-0.01em] text-(--ink)">{c.title}</h3>
              {c.body && (
                <p className={`font-body leading-normal text-pretty text-(--ink) opacity-94 ${threeUp ? "text-[15px]" : "text-sm"}`}>
                  {c.body}
                </p>
              )}
              {(c.email || c.phone) && (
                <div className="mt-auto flex flex-col gap-1 border-t border-dashed border-(--rule) pt-3">
                  {c.email && (
                    <a
                      href={`mailto:${c.email}`}
                      className="font-condensed text-[13px] font-semibold text-(--ink) underline underline-offset-[3px]"
                    >
                      {c.email}
                    </a>
                  )}
                  {c.phone && (
                    <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="font-condensed text-[13px] text-(--ink) opacity-85">
                      {c.phone}
                    </a>
                  )}
                </div>
              )}
              {c.cta && (
                <SmartLink
                  href={c.cta.href}
                  className="mt-auto font-condensed text-xs font-bold uppercase tracking-[0.14em] text-(--ink) underline underline-offset-[3px]"
                >
                  {c.cta.label} →
                </SmartLink>
              )}
            </Lift>
          ))}
        </div>
      </Container>
    </section>
  );
}
