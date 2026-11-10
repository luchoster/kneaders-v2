"use client";

import { useEffect, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import type { Keyed, PromoCarouselSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Headline, headlineText } from "../ui/headline";
import { Photo } from "../ui/photo";
import { Section, type Surface } from "../ui/section";

/**
 * Home hero — short headline beside one large photograph. With several slides
 * it cross-fades between them; the slides share one grid cell, so the hero
 * keeps the height of its tallest slide and nothing below it moves.
 */
export function PromoCarousel({
  slides,
  intervalSeconds = 6.5,
  surface,
}: Keyed<PromoCarouselSection> & { surface?: Surface }) {
  const [i, setI] = useState(0);
  const count = slides?.length ?? 0;
  // WCAG 2.2.2: auto-rotation stops while the pointer or keyboard focus is inside,
  // and never starts for people who prefer reduced motion.
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduceMotion(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const t = setInterval(() => setI((x) => (x + 1) % count), intervalSeconds * 1000);
    return () => clearInterval(t);
  }, [count, intervalSeconds, paused, reduceMotion]);

  if (!count) return null;
  const current = i % count;
  const fade = "transition-[opacity,visibility] duration-700 ease-out";

  return (
    <Section
      block="promoCarousel"
      surface={surface}
      size="none"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container className="pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,9vw,128px)]">
        <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-16">
          <div className="reveal-now col-span-12 md:col-span-5">
            <div className="grid" aria-live={paused || reduceMotion ? "polite" : "off"}>
              {slides.map((s, j) => {
                const active = j === current;
                // One <h1> per page: only the slide on show carries it.
                const Title = active ? "h1" : "p";
                return (
                  <div
                    key={s._key}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${j + 1} of ${count}`}
                    inert={!active}
                    className={`col-start-1 row-start-1 flex flex-col items-start gap-7 ${fade} ${
                      active ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    {s.eyebrow && <Eyebrow>{s.eyebrow}</Eyebrow>}
                    <Title className="type-h1">
                      <Headline headline={s.headline} />
                    </Title>
                    {s.body && <p className="type-lede max-w-[440px]">{s.body}</p>}
                    {s.cta && (
                      <Button href={s.cta.href} className="mt-2">
                        {s.cta.label}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            {count > 1 && (
              <div role="group" aria-label="Choose slide" className="mt-8 -ml-2 flex">
                {slides.map((x, j) => (
                  <AriaButton
                    key={x._key}
                    onPress={() => setI(j)}
                    aria-label={`Slide ${j + 1} of ${count}`}
                    aria-current={j === current ? "true" : undefined}
                    className="group/dot flex size-6 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                        j === current ? "w-5 bg-k-ink" : "w-1.5 bg-k-field-line group-hover/dot:bg-k-ink"
                      }`}
                    />
                  </AriaButton>
                ))}
              </div>
            )}
          </div>
          <div className="reveal-now col-span-12 [animation-delay:120ms] md:col-span-7">
            <div className="grid">
              {slides.map((s, j) => (
                <div
                  key={s._key}
                  aria-hidden={j !== current}
                  className={`col-start-1 row-start-1 ${fade} ${j === current ? "visible opacity-100" : "invisible opacity-0"}`}
                >
                  <Photo
                    media={s.image}
                    alt={s.image?.alt || headlineText(s.headline)}
                    ratio="5/4"
                    eager={j === 0}
                    sizes="(min-width: 1280px) 700px, (min-width: 768px) 55vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
