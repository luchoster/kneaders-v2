import type { ColorBlocksSection, Keyed } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { Sticker } from "../ui/sticker";

/**
 * Two saturated color blocks side by side (home "order / catering" split band,
 * story "giving / careers" doors). Blocks with an image get the plate layout.
 */
export function ColorBlocks({ blocks, tuckUnder }: Keyed<ColorBlocksSection>) {
  return (
    <section
      data-cms-block="colorBlocks"
      className={`bg-k-cream ${tuckUnder ? "pt-2 pb-[88px]" : "py-[72px]"}`}
    >
      <Container className="grid grid-cols-12 gap-6">
        {blocks?.map((b) => {
          const ink = b.textTone ?? "cream";
          const style = toneVars({ bg: hex(b.tone, "red"), ink: hex(ink, "cream") });
          const text = (
            <>
              <h3 className="font-headline text-[clamp(28px,2.8vw,42px)] uppercase leading-[0.95] tracking-[-0.01em] text-(--ink)">
                {b.title}
              </h3>
              {b.body && (
                <p
                  className={`font-body text-[15px] leading-normal text-pretty text-(--ink) ${b.image ? "opacity-92" : "opacity-94"}`}
                >
                  {b.body}
                </p>
              )}
              {b.cta && (
                <Button href={b.cta.href} tone={ink} ink={b.tone} arrow className={b.image ? "" : "mt-1"}>
                  {b.cta.label}
                </Button>
              )}
            </>
          );
          return b.image ? (
            <div
              key={b._key}
              className="relative col-span-12 overflow-hidden rounded-[28px] bg-(--bg) p-[clamp(28px,3.6vw,48px)] md:col-span-6"
              style={style}
            >
              <div className="flex flex-wrap items-center gap-6">
                <div className="w-[132px] shrink-0">
                  <Plate media={b.image} alt={b.image.alt ?? ""} disc="rgba(35,31,32,0.25)" sizes="132px" />
                </div>
                <div className="flex min-w-[220px] flex-1 flex-col items-start gap-3">{text}</div>
              </div>
              {b.sticker && (
                <div className="absolute top-[18px] right-[18px]">
                  <Sticker tone={b.sticker.tone} textTone={b.sticker.textTone} rotate={6} size="sm">
                    {b.sticker.text}
                  </Sticker>
                </div>
              )}
            </div>
          ) : (
            <div
              key={b._key}
              className="col-span-12 flex flex-col items-start gap-3 rounded-[28px] bg-(--bg) p-[clamp(28px,3.6vw,48px)] md:col-span-6"
              style={style}
            >
              {text}
            </div>
          );
        })}
      </Container>
    </section>
  );
}
