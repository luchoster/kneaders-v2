"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
import { Container } from "../ui/container";
import { Photo } from "../ui/photo";
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

/** Menu 02 + 03 — sticky category bar and one band per category; item photos carry the category color. */
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
  return (
    <nav ref={navRef} aria-label="Menu categories" className="sticky top-[72px] z-40 bg-k-black">
      <Container className="no-scrollbar flex items-center gap-x-6 gap-y-1 overflow-x-auto py-3">
        {categories.map((c) => (
          <a
            key={c._id}
            href={`#${c.slug}`}
            className="whitespace-nowrap font-display text-[15px] font-bold tracking-[-0.01em] text-k-tan"
          >
            <span className="link-anim inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full" style={{ background: palette[toneOf(c)] }} />
              {c.title}
            </span>
          </a>
        ))}
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
        <RuledHeading tone="brown" size="category" className="mb-3" nowrap>
          {category.title}
        </RuledHeading>
        {category.description?.length ? (
          <RichText
            value={category.description}
            className="mx-auto mb-10 max-w-[520px] text-center font-body text-base text-k-ink-2"
          />
        ) : (
          category.subtitle && (
            <p className="mx-auto mb-10 max-w-[520px] text-center font-body text-base text-k-ink-2">
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
                <motion.div whileHover={{ y: -6 }} className="w-[min(100%,250px)]">
                  <Photo media={it.image} alt="" mat={open === i ? palette.black : color} sizes="250px" />
                </motion.div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-headline text-[clamp(17px,1.6vw,22px)] uppercase leading-[1.05] tracking-[-0.01em] text-k-black">
                    {it.name}
                  </span>
                  {it.price != null && (
                    <span className="font-condensed text-sm font-semibold text-k-black">
                      {formatPrice(it.price)}
                    </span>
                  )}
                  <span className="font-condensed text-xs uppercase tracking-[0.16em] text-k-ink-2 underline underline-offset-[3px]">
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

/** Expanded detail panel — spans the full row; black with cream text for every category. */
function ItemDetail({
  id,
  item,
  orderCta,
  onClose,
  onExpanded,
}: {
  id: string;
  item: MenuItem;
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
  return (
    <motion.div
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
      data-tone="ink"
      className="col-span-full overflow-hidden [--field:var(--color-k-black)] [--ink:var(--color-k-cream)]"
    >
      <div className="relative isolate mt-1 grid grid-cols-12 items-center gap-x-4 gap-y-8 md:gap-x-8 rounded-3xl bg-(--field) p-[clamp(24px,3.4vw,44px)]">
        <AriaButton
          onPress={onClose}
          aria-label={`Close ${item.name} details`}
          className="absolute top-4 right-5 z-20 size-10 cursor-pointer rounded-full bg-(--ink) font-display text-base font-bold text-(--field)"
        >
          <span aria-hidden>✕</span>
        </AriaButton>
        <div className="col-span-12 md:col-span-4">
          <Photo media={item.image} alt={item.name} sizes="(min-width: 768px) 30vw, 90vw" />
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
                <Sticker key={p} variant="cream" size="tag">
                  {p}
                </Sticker>
              ))}
            </div>
          )}
          {orderCta && (
            <Button href={item.orderUrl || orderCta.href} tone="cream" ink="black" arrow className="mt-2">
              {orderCta.label}
            </Button>
          )}
        </div>
      </div>
      {/* Row spacing below the panel (see the grid in CategoryBand); collapses with it. */}
      <div aria-hidden className="h-12" />
    </motion.div>
  );
}
