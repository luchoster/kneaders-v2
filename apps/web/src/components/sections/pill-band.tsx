import type { Keyed, PillBandSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Sticker } from "../ui/sticker";

/** Home 02 — harvest-gold pill that overlaps down into the next (category) field. */
export function PillBand({ kicker, title, body, cta, sticker }: Keyed<PillBandSection>) {
  return (
    <section data-cms-block="pillBand" className="relative z-[2] bg-k-cream">
      <Container className="-mt-6 translate-y-14">
        <div className="grid grid-cols-12 items-center gap-6 rounded-[64px] bg-k-gold px-[clamp(28px,5vw,64px)] py-[clamp(28px,4vw,48px)] shadow-[0_12px_40px_rgba(35,31,32,0.14)]">
          <div className="col-span-12 flex flex-col gap-1 md:col-span-5">
            {kicker && (
              <span className="font-condensed text-sm font-semibold uppercase tracking-[0.22em] text-k-maroon">
                {kicker}
              </span>
            )}
            <span className="font-headline text-[clamp(40px,4.6vw,68px)] uppercase leading-[0.95] tracking-[-0.01em] text-k-black">
              {title}
            </span>
          </div>
          <div className="col-span-12 md:col-span-4">
            {body && <p className="font-body text-base leading-normal text-pretty text-k-black">{body}</p>}
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-3 md:justify-end">
            {cta && (
              <Button href={cta.href} tone="black" ink="tan">
                {cta.label}
              </Button>
            )}
            {sticker && (
              <Sticker tone={sticker.tone ?? "red"} textTone={sticker.textTone ?? "tan"} rotate={7}>
                {sticker.text}
              </Sticker>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
