import type { Keyed, MenuHeroSection } from "@kneaders/content";
import { hex } from "@/lib/tones";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { SplitHeadline } from "../ui/split-headline";
import { Sticker } from "../ui/sticker";
import { Ticket } from "../ui/ticket";

/** Menu 01 — "Our Menu" + featured plate + order-ticket how-to. */
export function MenuHero({ headline, bullets, featured, ticket }: Keyed<MenuHeroSection>) {
  return (
    <section data-cms-block="menuHero" className="bg-k-cream">
      <Container className="pt-14 pb-16">
        <div className="grid grid-cols-12 items-center gap-x-4 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <h1 className="font-headline text-[clamp(56px,7vw,120px)] font-normal uppercase leading-[0.9] tracking-[0.01em]">
              <SplitHeadline headline={headline} leadTone="sage" restTone="black" />
            </h1>
            {bullets && bullets.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2">
                {bullets.map((x) => (
                  <li key={x} className="flex gap-2 font-body text-[15px] text-k-maroon">
                    <span className="text-k-rust">·</span>
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative col-span-12 md:col-span-5">
            <Plate media={featured.image} alt={featured.title} disc={hex(featured.tone, "sage")} eager />
            {featured.sticker && (
              <div className="absolute top-3 right-0">
                <Sticker tone={featured.sticker.tone ?? "red"} textTone={featured.sticker.textTone ?? "tan"} rotate={7}>
                  {featured.sticker.text}
                </Sticker>
              </div>
            )}
            <div className="mt-4 text-center">
              {featured.kicker && (
                <span className="font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-k-rust">
                  {featured.kicker}
                </span>
              )}
              <h2 className="font-headline text-[clamp(26px,2.6vw,38px)] uppercase tracking-[-0.01em] text-k-black">
                {featured.title}
              </h2>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">{ticket && <Ticket ticket={ticket} />}</div>
        </div>
      </Container>
    </section>
  );
}
