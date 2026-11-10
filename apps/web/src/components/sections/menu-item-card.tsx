"use client";

import { useEffect, useRef, useState } from "react";
import { Button as AriaButton, Dialog, DialogTrigger, Heading, Modal, ModalOverlay } from "react-aria-components";
import type { Cta, Keyed, MenuItem, PortableTextBlock } from "@kneaders/content";
import { formatPrice } from "@/lib/format";
import { Button } from "../ui/button";
import { Eyebrow } from "../ui/eyebrow";
import { Photo } from "../ui/photo";
import { RichText } from "../ui/rich-text";
import { TextLink } from "../ui/text-link";

/** The description as one run of plain text, for the clamped preview on the card. */
const plainText = (blocks?: PortableTextBlock[] | null) =>
  (blocks ?? [])
    .map((b) => (b.children ?? []).map((c) => c.text).join(""))
    .filter(Boolean)
    .join(" ");

/** True while the element's text is cut off by its line clamp. */
function useClipped(text: string) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [clipped, setClipped] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setClipped(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    // A late web font can re-wrap the text without resizing the clamped box.
    document.fonts?.ready.then(check).catch(() => {});
    return () => observer.disconnect();
  }, [text]);
  return [ref, clipped] as const;
}

const facts = (item: MenuItem) =>
  [item.calories != null ? `${item.calories} cal` : null, ...(item.allergens ?? [])].filter(Boolean).join(" · ");

/**
 * Menu item card: vertical 4:5 photo, name, price, and the description clamped to three
 * lines. When the description runs longer, a quiet "More" at the end of the
 * third line (and a click anywhere on the card) opens the item's details sheet.
 */
export function MenuItemCard({
  item,
  category,
  orderCta,
  eager,
}: {
  item: Keyed<MenuItem>;
  /** Category title, shown as the eyebrow on the details sheet. */
  category: string;
  orderCta?: Cta;
  eager?: boolean;
}) {
  const text = plainText(item.description);
  const [clampRef, clipped] = useClipped(text);
  const meta = facts(item);
  const pairs = item.pairsWith?.filter(Boolean) ?? [];
  return (
    <div className="group/card relative flex flex-col gap-4">
      {/* The name below identifies the dish, so the photo is decorative. */}
      <Photo
        media={item.image}
        alt=""
        ratio="4/5"
        eager={eager}
        sizes="(min-width: 1600px) 370px, (min-width: 1360px) 25vw, (min-width: 1024px) 31vw, 47vw"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="type-h4 max-sm:text-[17px]">{item.name}</h3>
        {item.price != null && <span className="type-price text-base">{formatPrice(item.price)}</span>}
      </div>
      {text && (
        // The paragraph and "More" share one grid cell, so "More" sits over the end of the last line.
        <div className="-mt-1.5 grid">
          <p ref={clampRef} className="type-small col-start-1 row-start-1 line-clamp-3">
            {text}
          </p>
          {clipped && (
            <DialogTrigger>
              <AriaButton className="col-start-1 row-start-1 cursor-pointer self-end justify-self-end bg-[linear-gradient(to_right,transparent,var(--color-k-bg)_2rem)] pl-9 font-body text-sm leading-[1.55] font-medium text-k-ink underline decoration-1 underline-offset-[3px] transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-k-accent group-hover/card:text-k-accent">
                More<span className="sr-only"> about {item.name}</span>
              </AriaButton>
              <ItemSheet item={item} category={category} orderCta={orderCta} />
            </DialogTrigger>
          )}
        </div>
      )}
      {meta && <span className="type-meta text-xs lowercase">{meta}</span>}
      {pairs.length > 0 && <span className="type-meta text-xs">Pairs with {pairs.join(", ")}</span>}
      {orderCta && (
        // Sits above the card-wide "More" target so it stays its own link.
        <TextLink href={item.orderUrl || orderCta.href} className="relative z-[1] mt-1 self-start text-sm">
          {orderCta.label}
          <span className="sr-only">: {item.name}</span>
        </TextLink>
      )}
    </div>
  );
}

/**
 * The item's details sheet: the photo large beside the full description. A
 * centered card on wider screens, a sheet rising from the bottom on phones.
 * React Aria traps and restores focus, locks page scroll, and closes on Escape
 * or a click outside.
 */
function ItemSheet({ item, category, orderCta }: { item: Keyed<MenuItem>; category: string; orderCta?: Cta }) {
  const meta = facts(item);
  const pairs = item.pairsWith?.filter(Boolean) ?? [];
  return (
    <ModalOverlay
      isDismissable
      className="fixed inset-0 z-[100] flex items-end justify-center bg-k-ink/40 backdrop-blur-[3px] data-[entering]:animate-[k-fade_350ms_ease-out_both] data-[exiting]:animate-[k-fade_220ms_ease-in_reverse_both] md:items-center md:p-6"
    >
      <Modal className="max-h-[92dvh] w-full overflow-y-auto rounded-t-[14px] bg-k-bg shadow-[0_30px_90px_rgba(35,31,32,0.28)] data-[entering]:animate-[k-sheet_520ms_var(--ease-k)_both] data-[exiting]:animate-[k-sheet_220ms_ease-in_reverse_both] md:max-h-[min(86dvh,680px)] md:max-w-[960px] md:overflow-hidden md:rounded-[6px]">
        <Dialog className="relative grid outline-none md:max-h-[min(86dvh,680px)] md:grid-cols-[1.08fr_1fr]">
          {({ close }) => (
            <>
              <div className="overflow-hidden md:min-h-[460px]">
                <div className="h-full animate-[k-settle_1600ms_var(--ease-k)_both]">
                  <Photo
                    media={item.image}
                    alt=""
                    ratio="3/2"
                    eager
                    sizes="(min-width: 960px) 500px, 100vw"
                    className="rounded-none! md:aspect-auto md:h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 px-(--k-gutter) pt-8 pb-10 md:overflow-y-auto md:px-12 md:py-14">
                <Eyebrow>{category}</Eyebrow>
                <div className="flex items-baseline justify-between gap-6">
                  <Heading slot="title" className="type-h2-sm">
                    {item.name}
                  </Heading>
                  {item.price != null && <span className="type-price">{formatPrice(item.price)}</span>}
                </div>
                <div aria-hidden className="h-px bg-k-line" />
                <RichText value={item.description} className="type-body" />
                {meta && <p className="type-meta lowercase">{meta}</p>}
                {pairs.length > 0 && <p className="type-meta">Pairs with {pairs.join(", ")}</p>}
                {orderCta && (
                  <Button href={item.orderUrl || orderCta.href} className="mt-2 self-start">
                    {orderCta.label}
                  </Button>
                )}
              </div>
              <AriaButton
                onPress={close}
                className="absolute top-4 right-4 cursor-pointer rounded-full border border-k-line-strong bg-k-bg px-4 py-[7px] font-body text-[13px] font-medium text-k-ink transition-colors duration-[250ms] hover:border-k-ink"
              >
                Close
              </AriaButton>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
