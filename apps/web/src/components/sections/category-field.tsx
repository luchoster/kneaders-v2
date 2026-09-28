import { categoryTone, palette, type CategoryFieldSection, type Keyed } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Lift } from "../ui/lift";
import { Plate } from "../ui/plate";

/** Home 03 — full-bleed sage field of squircle category plates in style-guide colors. */
export function CategoryField({ tiles, tagline, cta }: Keyed<CategoryFieldSection>) {
  return (
    <section data-cms-block="categoryField" data-tone="ink" className="relative bg-k-sage pt-[140px] pb-[88px]">
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {tiles?.map((c, i) => (
            <Lift
              key={c._key}
              href={`/menu#${c.category}`}
              y={-8}
              rotate={i % 2 ? 1.5 : -1.5}
              className="col-span-6 flex flex-col items-center gap-5 md:col-span-3"
            >
              <div className="w-[min(100%,240px)]">
                <Plate media={c.image} alt={c.label} disc={palette[categoryTone(c.category)]} sizes="240px" />
              </div>
              <span className="text-center font-headline text-[clamp(20px,2vw,28px)] uppercase tracking-[0.03em] text-k-cream">
                {c.label}
              </span>
            </Lift>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          {tagline && (
            <div className="font-body text-[clamp(24px,3vw,40px)] font-semibold italic text-balance text-k-cream">
              {tagline}
            </div>
          )}
          {cta && (
            <Button href={cta.href} tone="black" ink="tan" arrow>
              {cta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
