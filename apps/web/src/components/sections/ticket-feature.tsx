import type { Keyed, TicketFeatureSection } from "@kneaders/content";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import { Container } from "../ui/container";
import { SplitHeadline } from "../ui/split-headline";
import { Ticket } from "../ui/ticket";

/**
 * Copy block paired with an order-ticket card (catering "how it works",
 * careers perks, story origin, giving September campaign).
 */
export function TicketFeature({
  theme = "light",
  ticketPosition = "right",
  eyebrow,
  headline,
  paragraphs,
  quote,
  chips,
  cta,
  ticket,
}: Keyed<TicketFeatureSection>) {
  const dark = theme === "dark";
  const left = ticketPosition === "left";
  const textWidth = left || dark ? "max-w-[520px]" : "max-w-[440px]";
  const para = `font-body text-[17px] leading-[1.55] text-pretty ${textWidth} ${dark ? "text-k-tan-deep" : "text-k-maroon"}`;

  const copyCols = dark ? "md:col-span-7" : left ? "md:col-span-6 md:col-start-7" : "md:col-span-6";
  const ticketCols = left ? "md:col-span-5" : dark ? "md:col-span-5" : "md:col-span-5 md:col-start-8";

  const copy = (
    <div className={`col-span-12 flex flex-col items-start gap-5 ${copyCols}`}>
      {eyebrow && (
        <span className="font-condensed text-[13px] font-semibold uppercase tracking-[0.2em] text-k-gold">{eyebrow}</span>
      )}
      <h2
        className={`font-headline uppercase leading-[0.95] tracking-[-0.01em] text-balance ${
          dark ? "text-[clamp(32px,4.4vw,60px)]" : "text-[clamp(30px,4vw,56px)]"
        }`}
      >
        <SplitHeadline headline={headline} leadTone={dark ? "tan" : "black"} restTone={dark ? "gold" : "rust"} />
      </h2>
      {paragraphs?.map((p) => (
        <p key={p} className={para}>
          {p}
        </p>
      ))}
      {quote && <p className={`${para} italic`}>{quote}</p>}
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      )}
      {cta && (
        <Button href={cta.href} tone={dark ? "gold" : "black"} ink={dark ? "black" : "tan"} arrow>
          {cta.label}
        </Button>
      )}
    </div>
  );
  const card = (
    <div className={`col-span-12 ${ticketCols}`}>
      <Ticket ticket={ticket} onDark={dark} />
    </div>
  );

  return (
    <section
      data-cms-block="ticketFeature"
      data-tone={dark ? "ink" : undefined}
      className={dark ? "bg-k-black py-[88px]" : `bg-k-cream pt-20 ${left ? "pb-20" : "pb-[88px]"}`}
    >
      <Container className="grid grid-cols-12 items-center gap-x-4 gap-y-10 md:gap-x-10">
        {left ? (
          <>
            {card}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {card}
          </>
        )}
      </Container>
    </section>
  );
}
