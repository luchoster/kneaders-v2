import type { ColorBlocksSection, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";

/**
 * Two panels side by side (home "order ahead / catering", story "giving /
 * careers"): a 3:2 photo, a title, a short paragraph and one link. A panel
 * without a photo opens with a hairline instead.
 */
export function ColorBlocks({ blocks, surface }: Keyed<ColorBlocksSection> & { surface?: Surface }) {
  return (
    <Section block="colorBlocks" surface={surface}>
      <Container className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {blocks?.map((b, i) => (
          <Reveal key={b._key} delay={i * 100} className="group/card relative flex flex-col gap-6">
            {b.image ? (
              <Photo media={b.image} ratio="3/2" sizes="(min-width: 1280px) 590px, (min-width: 768px) 45vw, 100vw" />
            ) : (
              <div aria-hidden className="h-px bg-k-line" />
            )}
            <div className="flex max-w-[480px] flex-col items-start gap-3">
              <h2 className="type-h2-sm">{b.title}</h2>
              {b.body && <p className="type-body">{b.body}</p>}
              {b.cta && (
                <TextLink href={b.cta.href} stretched className="mt-2">
                  {b.cta.label}
                </TextLink>
              )}
            </div>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
