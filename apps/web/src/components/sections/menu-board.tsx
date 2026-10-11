"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
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

/** Menu 02 + 03 — sticky category bar and one color-coded band per category. */
export function MenuBoard({ categories = [], orderCta }: Keyed<MenuBoardSection>) {
  const cats = categories.filter((c) => c.items?.length);
  return (
    <div data-cms-block="menuBoard">
      <CategoryBar categories={cats} />
      {cats.map((c, i) => (
        <CategoryBand key={c._id} category={c} index={i} orderCta={orderCta} />
      ))}
    </div>
  );
}

function CategoryBar({ categories }: { categories: MenuCategory[] }) {
  return (
    <nav aria-label="Menu categories" className="sticky top-[72px] z-40 bg-k-black">
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

function CategoryBand({ category, index, orderCta }: { category: MenuCategory; index: number; orderCta?: Cta }) {
  const [open, setOpen] = useState<number | null>(null);
  const cols = useColumns();
  const tone = toneOf(category);
  const color = palette[tone];
  const items = category.items;
  // The detail panel is inserted after the last card of the clicked card's row.
  // Closing returns focus to the card that opened the panel.
  const closeDetail = (cardIndex: number) => {
    setOpen(null);
    document.getElementById(`item-${category.slug}-${cardIndex}`)?.focus();
  };
  const rowEnd = open == null ? -1 : Math.min(Math.floor(open / cols) * cols + cols - 1, items.length - 1);

  return (
    <section
      id={category.slug}
      data-cms-block={`menuBoard.${category.slug}`}
      className={`scroll-mt-[130px] pt-[72px] pb-20 ${index % 2 ? "bg-k-tan" : "bg-k-cream"}`}
    >
      <Container>
        <RuledHeading tone={tone} size="category" className="mb-3" nowrap>
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
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-12 lg:grid-cols-3">
          {items.map((it, i) => (
            <Fragment key={it._key}>
              <AriaButton
                id={`item-${category.slug}-${i}`}
                onPress={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="group flex cursor-pointer flex-col items-center gap-x-4 gap-y-[22px] text-center"
              >
                <motion.div whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }} className="w-[min(100%,250px)]">
                  <Plate media={it.image} alt="" disc={open === i ? palette.black : color} sizes="250px" />
                </motion.div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-headline text-[clamp(17px,1.6vw,22px)] uppercase leading-[1.05] tracking-[-0.01em] text-k-black">
                    {it.name}
                  </span>
                  {it.price != null && (
                    <span className="font-condensed text-sm font-semibold" style={{ color }}>
                      {formatPrice(it.price)}
                    </span>
                  )}
                  <span className="font-condensed text-xs uppercase tracking-[0.16em] text-k-maroon underline underline-offset-[3px]">
                    {open === i ? "Close" : "See more"}
                  </span>
                </div>
              </AriaButton>
              {i === rowEnd && open != null && (
                <AnimatePresence>
                  <ItemDetail
                    key={`detail-${open}`}
                    item={items[open]}
                    tone={tone}
                    orderCta={orderCta}
                    onClose={() => closeDetail(open)}
                  />
                </AnimatePresence>
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Expanded detail panel — spans the full row, flooded with the category color. */
function ItemDetail({
  item,
  tone,
  orderCta,
  onClose,
}: {
  item: MenuItem;
  tone: Tone;
  orderCta?: Cta;
  onClose: () => void;
}) {
  const inkTone = inkOnField(tone);
  const style = toneVars({ field: palette[tone], ink: palette[inkTone] });
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="region"
      aria-label={`${item.name} details`}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="col-span-full"
      style={style}
    >
      <div className="relative mt-1 grid grid-cols-12 items-center gap-x-4 gap-y-8 md:gap-x-8 rounded-3xl bg-(--field) p-[clamp(24px,3.4vw,44px)]">
        <AriaButton
          onPress={onClose}
          aria-label={`Close ${item.name} details`}
          className="absolute top-4 right-5 size-10 cursor-pointer rounded-full bg-(--ink) font-display text-base font-bold text-(--field)"
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
            className="max-w-[560px] font-body text-[17px] leading-normal text-pretty text-(--ink) opacity-94"
          />
          <div className="flex flex-wrap items-center gap-2">
            {item.calories != null && (
              <span className="rounded-full border border-(--ink) px-3 py-1 font-condensed text-xs uppercase tracking-[0.12em] text-(--ink) opacity-85">
                {item.calories} cal
              </span>
            )}
            {(item.allergens ?? []).map((a) => (
              <span
                key={a}
                className="rounded-full border border-(--ink) px-3 py-1 font-condensed text-xs uppercase tracking-[0.12em] text-(--ink) opacity-65"
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
                <Sticker key={p} tone={inkTone} textTone={tone} rotate={-2} size="tag">
                  {p}
                </Sticker>
              ))}
            </div>
          )}
          {orderCta && (
            <Button href={item.orderUrl || orderCta.href} tone={inkTone} ink={tone} arrow className="mt-2">
              {orderCta.label}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
