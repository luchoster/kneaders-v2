import type { Keyed, PageHeroSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Headline, headlineText } from "../ui/headline";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";

/**
 * Interior page hero. Every arrangement is light; the CMS options pick the layout:
 *  - no image (`textOnly`): a quiet centered intro — Journal, Contact, Donations
 *  - image: text beside a 5:4 photo — Catering, Careers, Giving
 *  - image + `theme: "dark"`: the showcase hero — centered intro, then a
 *    full-width 21:9 photo with the stats beneath it — Our Story
 * A solid button is the primary action; an outline button becomes a text link.
 */
export function PageHero({
  theme = "light",
  layout = "wide",
  eyebrow,
  headline,
  body,
  buttons,
  image,
  stats,
  tags,
  surface,
}: Keyed<PageHeroSection> & { surface?: Surface }) {
  const hasImage = layout !== "textOnly" && !!image;
  const split = hasImage && theme !== "dark";
  const alt = image?.alt || headlineText(headline);

  const actions = buttons && buttons.length > 0 && (
    <div className={`mt-2 flex flex-wrap items-center gap-6 ${split ? "" : "justify-center"}`}>
      {buttons.map((b) =>
        b.style === "outline" ? (
          <TextLink key={b._key} href={b.href}>
            {b.label}
          </TextLink>
        ) : (
          <Button key={b._key} href={b.href}>
            {b.label}
          </Button>
        ),
      )}
    </div>
  );
  const tagList = tags && tags.length > 0 && (
    <ul className={`mt-2 flex flex-wrap gap-x-7 gap-y-2 ${split ? "" : "justify-center"}`}>
      {tags.map((t) => (
        <li key={t} className="font-body text-[15px] text-k-ink-2">
          {t}
        </li>
      ))}
    </ul>
  );
  const statList = stats && stats.length > 0 && (
    <dl
      className={
        split
          ? "mt-4 flex flex-wrap gap-x-10 gap-y-6"
          : "mt-[clamp(48px,6vw,80px)] grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
      }
    >
      {stats.map((s) => (
        <div key={s._key} className={`flex flex-col-reverse gap-2 ${split ? "" : "items-center text-center"}`}>
          <dt className="type-meta">{s.label}</dt>
          <dd
            className={`font-display font-light leading-none text-k-ink lining-nums ${
              split ? "text-[clamp(28px,2.6vw,36px)]" : "text-[clamp(40px,4vw,56px)]"
            }`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  if (split) {
    return (
      <Section block="pageHero" surface={surface} size="none">
        <Container className="pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,9vw,128px)]">
          <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-16">
            <Reveal immediate className="col-span-12 flex flex-col items-start gap-7 md:col-span-5">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <h1 className="type-h1">
                <Headline headline={headline} />
              </h1>
              {body && <p className="type-lede max-w-[460px]">{body}</p>}
              {tagList}
              {actions}
              {statList}
            </Reveal>
            <Reveal immediate delay={120} className="col-span-12 md:col-span-7">
              <Photo
                media={image}
                alt={alt}
                ratio="5/4"
                eager
                sizes="(min-width: 1280px) 700px, (min-width: 768px) 55vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section block="pageHero" surface={surface} size="none">
      <Container
        narrow
        className={`pt-[clamp(56px,7vw,104px)] ${hasImage ? "pb-[clamp(48px,6vw,80px)]" : "pb-[clamp(56px,7vw,96px)]"}`}
      >
        <Reveal immediate className="flex flex-col items-center gap-6 text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="type-h1">
            <Headline headline={headline} />
          </h1>
          {body && <p className="type-lede max-w-[580px]">{body}</p>}
          {tagList}
          {actions}
        </Reveal>
      </Container>
      {hasImage ? (
        <Container className="pb-[clamp(72px,9vw,128px)]">
          <Reveal immediate delay={120}>
            <Photo
              media={image}
              alt={alt}
              ratio="21/9"
              className="max-md:aspect-[3/2]"
              eager
              sizes="(min-width: 1280px) 1136px, 90vw"
            />
          </Reveal>
          {statList}
        </Container>
      ) : (
        statList && <Container className="pb-[clamp(56px,7vw,96px)]">{statList}</Container>
      )}
    </Section>
  );
}
