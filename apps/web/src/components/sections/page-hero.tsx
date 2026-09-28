import { journalTagTone, palette, type Keyed, type PageHeroSection } from "@kneaders/content";
import { hex } from "@/lib/tones";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { SplitHeadline } from "../ui/split-headline";
import { Sticker } from "../ui/sticker";

/**
 * Interior page hero. Layouts:
 *  - textOnly: headline + copy (+ tag chips) — Journal, Contact
 *  - balanced: 6 / 6 with a capped plate — Catering
 *  - wide:     7 / 5 — Careers, Giving, Story (dark)
 */
export function PageHero({
  theme = "light",
  layout = "wide",
  size = "large",
  eyebrow,
  headline,
  body,
  buttons,
  image,
  plateTone,
  sticker,
  stats,
  tags,
}: Keyed<PageHeroSection>) {
  const dark = theme === "dark";
  const hasImage = layout !== "textOnly" && !!image;

  const titleSize =
    size === "large" ? "text-[clamp(48px,6.6vw,108px)]" : "text-[clamp(44px,6.4vw,100px)]";
  const bodyWidth = layout === "balanced" ? "max-w-[440px]" : dark ? "max-w-[540px]" : "max-w-[520px]";
  const bodyLeading = layout === "wide" ? "leading-[1.55]" : "leading-normal";

  const copy = (
    <div className={`flex flex-col items-start ${dark ? "gap-6" : "gap-5"}`}>
      {eyebrow && (
        <span
          className={`font-condensed text-sm font-semibold italic uppercase tracking-[0.2em] ${dark ? "text-k-gold" : "text-k-rust"}`}
        >
          {eyebrow}
        </span>
      )}
      <h1 className={`font-headline font-normal uppercase leading-[0.92] tracking-[0.01em] ${titleSize}`}>
        <SplitHeadline headline={headline} leadTone={dark ? "tan" : "black"} restTone={dark ? "gold" : "black"} />
      </h1>
      {body && (
        <p
          className={`font-body text-lg text-pretty ${bodyLeading} ${bodyWidth} ${dark ? "text-k-tan-deep" : "text-k-maroon"}`}
        >
          {body}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip key={t} color={palette[journalTagTone(t)]} className="font-semibold">
              {t}
            </Chip>
          ))}
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {buttons.map((b) =>
            b.style === "outline" ? (
              <Button key={b._key} href={b.href} variant="outline" ink={dark ? "tan" : "black"} tone={dark ? "black" : "cream"}>
                {b.label}
              </Button>
            ) : (
              <Button key={b._key} href={b.href} tone={b.tone ?? "red"} ink="tan" arrow>
                {b.label}
              </Button>
            ),
          )}
        </div>
      )}
      {stats && stats.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-8">
          {stats.map((s) => (
            <div key={s._key} className="flex flex-col">
              <span className="font-headline text-[clamp(26px,2.6vw,40px)] tracking-[-0.01em] text-k-tan">{s.value}</span>
              <span className="font-condensed text-xs uppercase tracking-[0.18em] text-k-gold">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (!hasImage) {
    return (
      <section data-cms-block="pageHero" data-tone={dark ? "ink" : undefined} className={dark ? "bg-k-black" : "bg-k-cream"}>
        <Container className={`pt-14 ${tags?.length ? "pb-12" : "pb-14"}`}>{copy}</Container>
      </section>
    );
  }

  const disc = hex(plateTone, dark ? "gold" : "blue");
  const stickerEl = sticker && (
    <Sticker tone={sticker.tone ?? "gold"} textTone={sticker.textTone} rotate={dark ? -7 : 7}>
      {sticker.text}
    </Sticker>
  );
  const stickerPos = dark ? "left-1 bottom-6" : layout === "balanced" ? "right-3 top-2" : "right-2 top-2";

  return (
    <section
      data-cms-block="pageHero"
      data-tone={dark ? "ink" : undefined}
      className={dark ? "bg-k-black pt-[88px] pb-24" : "bg-k-cream"}
    >
      <Container
        className={`grid grid-cols-12 items-center ${dark ? "gap-x-4 gap-y-10 md:gap-x-10" : "gap-x-4 gap-y-8 md:gap-x-8 pt-14 pb-16"}`}
      >
        <div className={`col-span-12 ${layout === "balanced" ? "md:col-span-6" : "md:col-span-7"}`}>{copy}</div>
        <div className={`relative col-span-12 ${layout === "balanced" ? "md:col-span-6" : "md:col-span-5"}`}>
          {layout === "balanced" ? (
            <div className="ml-auto w-[min(100%,520px)]">
              <Plate media={image} disc={disc} eager sizes="(min-width: 768px) 520px, 100vw" />
            </div>
          ) : (
            <Plate media={image} disc={disc} eager />
          )}
          {stickerEl && <div className={`absolute ${stickerPos}`}>{stickerEl}</div>}
        </div>
      </Container>
    </section>
  );
}
