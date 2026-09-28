import type { DifferenceBandSection, Keyed } from "@kneaders/content";
import { palette } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { SplitHeadline } from "../ui/split-headline";
import { Sticker } from "../ui/sticker";

/** Home 05 — "The Kneaders difference" black band: plate + four numbered values. */
export function DifferenceBand({ headline, image, sticker, values, cta }: Keyed<DifferenceBandSection>) {
  return (
    <section data-cms-block="differenceBand" data-tone="ink" className="bg-k-black py-24">
      <Container className="grid grid-cols-12 items-center gap-x-4 gap-y-10 md:gap-x-10">
        <div className="relative col-span-12 md:col-span-5">
          <Plate media={image} disc={palette.gold} />
          {sticker && (
            <div className="absolute bottom-7 left-2">
              <Sticker tone={sticker.tone ?? "gold"} textTone={sticker.textTone} rotate={-7}>
                {sticker.text}
              </Sticker>
            </div>
          )}
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-7">
          <h2 className="font-headline text-[clamp(36px,4.8vw,68px)] uppercase leading-[0.95] tracking-[-0.01em] text-balance">
            <SplitHeadline headline={headline} leadTone="tan" restTone="gold" />
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-7">
            {values?.map((v) => (
              <div key={v._key} className="flex flex-col gap-2">
                <span className="font-condensed text-[13px] font-semibold tracking-[0.14em] text-k-gold">{v.number}</span>
                <h3 className="font-display text-[19px] font-bold tracking-[-0.01em] text-k-tan">{v.title}</h3>
                <p className="font-body text-sm leading-normal text-pretty text-k-tan-deep">{v.body}</p>
              </div>
            ))}
          </div>
          {cta && (
            <Button href={cta.href} tone="tan" ink="black" className="self-start">
              {cta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
