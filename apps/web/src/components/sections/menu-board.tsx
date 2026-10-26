"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState, type RefObject } from "react";
import { Button as AriaButton } from "react-aria-components";
import {
  categoryTone,
  palette,
  type Cta,
  type Keyed,
  type MenuBoardSection,
  type MenuCategory,
  type MenuItem,
  type Tone,
} from "@kneaders/content";
import { formatPrice } from "@/lib/format";
import { inkOnField, toneVars } from "@/lib/tones";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { RuledHeading } from "../ui/ruled-heading";
import { Sticker } from "../ui/sticker";
import { Button } from "../ui/button";
import { RichText } from "../ui/rich-text";

/** 3 columns ≥1024px, otherwise 2 — used to open the detail panel in the right row. */
function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setCols(mq.matches ? 3 : 2);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return cols;
}

const toneOf = (c: MenuCategory): Tone => c.tone ?? categoryTone(c.slug);

/**
 * WCAG AA: these category tones are too dark for black text and too light for
 * tan, so the detail panel uses a lighter tone from the same family (≥ 7:1 with
 * black). The category color still marks the band, plates and nav dots.
 */
const PANEL_TONE: Partial<Record<Tone, Tone>> = { blue: "blueLight", sage: "sageLight", rust: "tanDeep" };
/** Gold is under 3:1 on the tan bands; deep gold passes on both tan and cream. */
const HEADING_TONE: Partial<Record<Tone, Tone>> = { gold: "goldDeep" };

/** Menu 02 + 03 — sticky category bar and one color-coded band per category. */
export function MenuBoard({ categories = [], orderCta }: Keyed<MenuBoardSection>) {
  const cats = categories.filter((c) => c.items?.length);
  const navRef = useRef<HTMLElement>(null);
  return (
    <div data-cms-block="menuBoard">
      <CategoryBar categories={cats} navRef={navRef} />
      {cats.map((c, i) => (
        <CategoryBand key={c._id} category={c} index={i} orderCta={orderCta} navRef={navRef} />
      ))}
    </div>
  );
}

function CategoryBar({ categories, navRef }: { categories: MenuCategory[]; navRef: RefObject<HTMLElement | null> }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Highlight the category whose section sits under the sticky bars (scroll or click).
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    // Top offset ≈ main nav (72) + category bar (~46). Bottom cuts the viewport so the
    // "active" band is a strip just below the sticky bars.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target instanceof HTMLElement && visible[0].target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: [0, 0.1, 0.25] },
    );

    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active chip in view inside the horizontal scroller.
  useEffect(() => {
    const el = linkRefs.current.get(activeSlug);
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeSlug]);

  return (
    <nav ref={navRef} aria-label="Menu categories" className="sticky top-[72px] z-40 bg-k-black">
      <Container className="no-scrollbar flex items-center gap-x-6 gap-y-1 overflow-x-auto py-3">
        {categories.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <a
              key={c._id}
              ref={(node) => {
                if (node) linkRefs.current.set(c.slug, node);
                else linkRefs.current.delete(c.slug);
              }}
              href={`#${c.slug}`}
              aria-current={active ? "true" : undefined}
              onClick={() => setActiveSlug(c.slug)}
              className="hit-area relative whitespace-nowrap font-display text-[15px] font-bold tracking-[-0.01em] text-k-tan [--hit-y:12px]"
            >
              <span
                className={`link-anim inline-flex items-center gap-2${active ? " link-anim-active" : ""}`}
              >
                <span aria-hidden className="size-2 rounded-full" style={{ background: palette[toneOf(c)] }} />
                {c.title}
              </span>
            </a>
          );
        })}
      </Container>
    </nav>
  );
}

function CategoryBand({
  category,
  index,
  orderCta,
  navRef,
}: {
  category: MenuCategory;
  index: number;
  orderCta?: Cta;
  navRef: RefObject<HTMLElement | null>;
}) {
  const [open, setOpen] = useState<number | null>(null);
  // The card whose panel should be scrolled into view once it finishes expanding.
  const pendingReveal = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const cols = useColumns();
  const tone = toneOf(category);
  const color = palette[tone];
  const items = category.items;
  const cardId = (i: number) => `item-${category.slug}-${i}`;
  const panelId = (i: number) => `${cardId(i)}-details`;
  const openRow = open == null ? -1 : Math.floor(open / cols);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    pendingReveal.current = next;
    setOpen(next);
  };
  // Closing returns focus to the card that opened the panel.
  const closeDetail = (cardIndex: number) => {
    pendingReveal.current = null;
    setOpen(null);
    document.getElementById(cardId(cardIndex))?.focus();
  };
  // Scroll just enough to show the card and its panel below the sticky navs.
  const revealDetail = (cardIndex: number, panel: HTMLElement) => {
    if (pendingReveal.current !== cardIndex) return;
    pendingReveal.current = null;
    const card = document.getElementById(cardId(cardIndex));
    if (!card) return;
    // Height of the sticky bars once stuck: the category nav's `top` (the main nav) plus its own height.
    const nav = navRef.current;
    const viewTop = nav ? parseFloat(getComputedStyle(nav).top) + nav.offsetHeight : 0;
    const viewBottom = window.innerHeight;
    const { top } = card.getBoundingClientRect();
    const { bottom } = panel.getBoundingClientRect();
    if (top >= viewTop && bottom <= viewBottom) return;
    const gap = 16;
    const fits = bottom - top <= viewBottom - viewTop - gap * 2;
    const delta = !fits || top < viewTop ? top - viewTop - gap : bottom - viewBottom + gap;
    window.scrollBy({ top: delta, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <section
      id={category.slug}
      data-cms-block={`menuBoard.${category.slug}`}
      className={`scroll-mt-[130px] pt-[72px] pb-20 ${index % 2 ? "bg-k-tan" : "bg-k-cream"}`}
    >
      <Container>
        <RuledHeading tone={HEADING_TONE[tone] ?? tone} size="category" className="mb-3" nowrap>
          {category.title}
        </RuledHeading>
        {category.description?.length ? (
          <RichText
            value={category.description}
            className="mx-auto mb-10 max-w-[520px] text-center font-body text-base text-k-maroon"
          />
        ) : (
          category.subtitle && (
            <p className="mx-auto mb-10 max-w-[520px] text-center font-body text-base text-k-maroon">
              {category.subtitle}
            </p>
          )
        )}
        {/* Row spacing lives on the cards (and inside the panel) rather than in the grid gap,
            so a collapsing panel takes its spacing with it. */}
        <div className="-mb-12 grid grid-cols-2 items-start gap-x-6 lg:grid-cols-3">
          {items.map((it, i) => (
            <Fragment key={it._key}>
              <AriaButton
                id={cardId(i)}
                onPress={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={open === i ? panelId(i) : undefined}
                className="group mb-12 flex cursor-pointer flex-col items-center gap-x-4 gap-y-[22px] text-center"
              >
                <m.div whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }} className="w-[min(100%,250px)]">
                  <Plate media={it.image} alt="" disc={open === i ? palette.black : color} sizes="250px" />
                </m.div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-headline text-[clamp(17px,1.6vw,22px)] uppercase leading-[1.05] tracking-[-0.01em] text-k-black">
                    {it.name}
                  </span>
                  {it.price != null && (
                    <span className="font-condensed text-sm font-semibold text-k-black">
                      {formatPrice(it.price)}
                    </span>
                  )}
                  <span className="font-condensed text-xs uppercase tracking-[0.16em] text-k-maroon underline underline-offset-[3px]">
                    {open === i ? "Close" : "See more"}
                  </span>
                </div>
              </AriaButton>
              {/* Every row end keeps a mounted AnimatePresence so the panel animates out too;
                  the panel opens after the last card of the pressed card's row. */}
              {(i % cols === cols - 1 || i === items.length - 1) && (
                <AnimatePresence initial={false} mode="wait">
                  {open != null && openRow === Math.floor(i / cols) && (
                    <ItemDetail
                      key={items[open]._key}
                      id={panelId(open)}
                      item={items[open]}
                      tone={tone}
                      orderCta={orderCta}
                      onClose={() => closeDetail(open)}
                      onExpanded={(panel) => revealDetail(open, panel)}
                    />
                  )}
                </AnimatePresence>
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Expanded detail panel — spans the full row, flooded with the category color (or `PANEL_TONE`). */
function ItemDetail({
  id,
  item,
  tone,
  orderCta,
  onClose,
  onExpanded,
}: {
  id: string;
  item: MenuItem;
  tone: Tone;
  orderCta?: Cta;
  onClose: () => void;
  onExpanded: (panel: HTMLElement) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // MotionConfig only drops transforms for reduced motion; height and opacity are made instant here.
  const reduceMotion = useReducedMotion();
  // An instant (duration 0) transition doesn't reliably fire onAnimationComplete, so under reduced
  // motion reveal after mount instead: two frames lets the panel reach full height and any
  // panel closing elsewhere be removed before measuring.
  const onExpandedRef = useRef(onExpanded);
  onExpandedRef.current = onExpanded;
  useEffect(() => {
    if (!reduceMotion) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (ref.current) onExpandedRef.current(ref.current);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);
  const field = PANEL_TONE[tone] ?? tone;
  const inkTone = inkOnField(field);
  const style = toneVars({ field: palette[field], ink: palette[inkTone] });
  return (
    <m.div
      ref={ref}
      id={id}
      variants={{ collapsed: { height: 0, opacity: 0 }, open: { height: "auto", opacity: 1 } }}
      initial="collapsed"
      animate="open"
      exit="collapsed"
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={(definition) => {
        if (!reduceMotion && definition === "open" && ref.current) onExpanded(ref.current);
      }}
      role="region"
      aria-label={`${item.name} details`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="col-span-full overflow-hidden"
      style={style}
    >
      <div className="relative isolate mt-1 grid grid-cols-12 items-center gap-x-4 gap-y-8 md:gap-x-8 rounded-3xl bg-(--field) p-[clamp(24px,3.4vw,44px)]">
        <AriaButton
          onPress={onClose}
          aria-label={`Close ${item.name} details`}
          className="hit-area absolute top-4 right-5 z-20 size-10 cursor-pointer rounded-full bg-(--ink) font-display text-base font-bold text-(--field) [--hit-x:2px] [--hit-y:2px]"
        >
          <span aria-hidden>✕</span>
        </AriaButton>
        <div className="col-span-12 md:col-span-4">
          <Plate media={item.image} alt={item.name} disc="rgba(35,31,32,0.22)" sizes="(min-width: 768px) 30vw, 90vw" />
        </div>
        <div className="col-span-12 flex flex-col items-start gap-4 md:col-span-8">
          <div className="flex flex-wrap items-center gap-4 pr-11">
            <h3 className="font-headline text-[clamp(28px,3vw,44px)] uppercase leading-[0.95] tracking-[-0.01em] text-(--ink)">
              {item.name}
            </h3>
            {item.price != null && (
              <span className="font-condensed text-lg font-semibold text-(--ink)">{formatPrice(item.price)}</span>
            )}
          </div>
          <RichText
            value={item.description}
            className="max-w-[560px] font-body text-[17px] leading-normal text-pretty text-(--ink)"
          />
          <div className="flex flex-wrap items-center gap-2">
            {item.calories != null && (
              <span className="rounded-full border border-(--ink) px-3 py-1 font-condensed text-xs uppercase tracking-[0.12em] text-(--ink)">
                {item.calories} cal
              </span>
            )}
            {(item.allergens ?? []).map((a) => (
              <span
                key={a}
                className="rounded-full border border-(--ink) px-3 py-1 font-condensed text-xs uppercase tracking-[0.12em] text-(--ink)"
              >
                {a}
              </span>
            ))}
          </div>
          {item.pairsWith && item.pairsWith.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-condensed text-[13px] font-semibold uppercase tracking-[0.18em] text-(--ink)">
                Pairs with
              </span>
              {item.pairsWith.map((p) => (
                <Sticker key={p} tone={inkTone} textTone={field} rotate={-2} size="tag">
                  {p}
                </Sticker>
              ))}
            </div>
          )}
          {orderCta && (
            <Button href={item.orderUrl || orderCta.href} tone={inkTone} ink={field} arrow className="mt-2">
              {orderCta.label}
            </Button>
          )}
        </div>
      </div>
      {/* Row spacing below the panel (see the grid in CategoryBand); collapses with it. */}
      <div aria-hidden className="h-12" />
    </m.div>
  );
}
