import type { Keyed, MenuHeroSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Headline } from "../ui/headline";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { Steps } from "../ui/steps";

/** Menu intro — headline and notes beside the featured item's photo, with the how-to list beneath. */
export function MenuHero({ headline, bullets, featured, ticket, surface }: Keyed<MenuHeroSection> & { surface?: Surface }) {
  return (
    <Section block="menuHero" surface={surface} size="none">
      <Container className="pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,9vw,128px)]">
        <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-16">
          <Reveal immediate className="col-span-12 flex flex-col items-start gap-7 md:col-span-5">
            <h1 className="type-h1">
              <Headline headline={headline} />
            </h1>
            {bullets && bullets.length > 0 && (
              <ul className="flex w-full max-w-[440px] flex-col">
                {bullets.map((x) => (
                  <li key={x} className="type-body border-t border-k-line py-3">
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal immediate delay={120} className="col-span-12 md:col-span-7">
            <figure className="flex flex-col gap-4">
              <Photo
                media={featured.image}
                alt={featured.image?.alt || featured.title}
                ratio="5/4"
                eager
                sizes="(min-width: 1280px) 700px, (min-width: 768px) 55vw, 100vw"
              />
              <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                {featured.kicker && <Eyebrow>{featured.kicker}</Eyebrow>}
                <span className="type-h4">{featured.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        {ticket && <Steps ticket={ticket} heading="h3" className="mt-[clamp(56px,7vw,96px)] max-w-[760px]" />}
      </Container>
    </Section>
  );
}
