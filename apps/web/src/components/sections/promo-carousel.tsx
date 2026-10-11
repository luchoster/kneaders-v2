"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { categoryTone, palette, type Keyed, type PromoCarouselSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { SplitHeadline } from "../ui/split-headline";
import { Sticker } from "../ui/sticker";

/** Home 01 — rotating promo banner: squircle hero plate + sticker, two-tone headline. */
export function PromoCarousel({ slides, intervalSeconds = 6.5 }: Keyed<PromoCarouselSection>) {
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
  const s = slides[i % count];

  return (
    <section
      data-cms-block="promoCarousel"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden bg-k-cream"
    >
      <Container>
        <div className="grid grid-cols-12 items-center gap-x-4 gap-y-8 md:gap-x-8 pt-14 pb-[72px]">
          <div className="order-2 col-span-12 md:order-1 md:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={s._key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-live={paused || reduceMotion ? "polite" : "off"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col items-start gap-5"
              >
                {s.eyebrow && (
                  <span className="font-condensed text-sm font-semibold italic uppercase tracking-[0.2em] text-k-rust">
                    {s.eyebrow}
                  </span>
                )}
                <h1 className="font-headline text-[clamp(52px,6.6vw,110px)] font-normal uppercase leading-[0.92] tracking-[0.01em]">
                  <SplitHeadline headline={{ stacked: true, ...s.headline }} leadTone="red" restTone="black" />
                </h1>
                {s.body && (
                  <p className="max-w-[400px] font-body text-lg leading-normal text-pretty text-k-maroon">{s.body}</p>
                )}
                {s.cta && (
                  <Button href={s.cta.href} tone="black" ink="tan" arrow>
                    {s.cta.label}
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
            {count > 1 && (
              <div role="group" aria-label="Choose slide" className="mt-8 flex gap-2">
                {slides.map((x, j) => (
                  <AriaButton
                    key={x._key}
                    onPress={() => setI(j)}
                    aria-label={`Slide ${j + 1} of ${count}`}
                    aria-current={j === i ? "true" : undefined}
                    className={`h-2.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 ${
                      j === i ? "w-7 bg-k-red" : "w-2.5 bg-k-tan-deep"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative order-1 col-span-12 md:order-2 md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={s._key}
                initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative ml-auto w-[min(100%,540px)]"
              >
                <Plate
                  media={s.image}
                  alt={s.image?.alt || [s.headline.lead, s.headline.rest].filter(Boolean).join(" ")}
                  disc={palette[categoryTone(s.category)]}
                  eager
                  sizes="(min-width: 768px) 540px, 100vw"
                />
                {s.sticker && (
                  <div className="absolute right-[18px] bottom-[38px]">
                    <Sticker tone={s.sticker.tone ?? "gold"} textTone={s.sticker.textTone} rotate={-8}>
                      {s.sticker.text}
                    </Sticker>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
