import type { Keyed, PackageGridSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Intro } from "../ui/intro";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";

/** Catering packages — a centered intro over four photo cards: tier, title, price, inclusions, minimum. */
export function PackageGrid({
  anchorId,
  heading,
  packages,
  inquireHref = "#inquire",
  surface,
}: Keyed<PackageGridSection> & { surface?: Surface }) {
  return (
    <Section id={anchorId} block="packageGrid" surface={surface} className="scroll-mt-[90px]">
      <Container>
        <Reveal className="mb-16">
          <Intro align="center" title={heading} />
        </Reveal>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {packages?.map((p, i) => (
            <Reveal as="li" key={p._key} delay={i * 80} className="flex flex-col gap-4">
              {/* The title below names the package, so the photo is decorative. */}
              <Photo media={p.image} alt="" ratio="4/5" sizes="(min-width: 1280px) 270px, (min-width: 640px) 45vw, 100vw" />
              <div className="mt-1 flex flex-col gap-1.5">
                <Eyebrow>{p.tier}</Eyebrow>
                <h3 className="type-h3">{p.title}</h3>
                {p.priceRange && <span className="type-price text-base">{p.priceRange}</span>}
              </div>
              <ul className="flex flex-col gap-1.5 border-t border-k-line pt-3">
                {p.includes.map((it) => (
                  <li key={it} className="type-small">
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-1">
                <span className="type-meta">{p.minimum}</span>
                <TextLink href={inquireHref} className="text-sm">
                  Inquire<span className="sr-only"> about {p.title}</span>
                </TextLink>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
