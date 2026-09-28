import type { Ticket as TicketData } from "@kneaders/content";

/** Tilted bakery order ticket with dashed tear lines. */
export function Ticket({ ticket, onDark = false }: { ticket: TicketData; onDark?: boolean }) {
  // On black sections the prototype's hairline + ink-3 tokens remap (data-tone="ink").
  const rule = onDark ? "border-k-line-dark" : "border-k-line";
  const meta = onDark ? "text-k-gold" : "text-k-ink-3";
  const steps = ticket.steps ?? [];
  return (
    <div
      className={`relative rotate-[1.2deg] border bg-k-tan px-[26px] pt-[26px] pb-5 shadow-[0_10px_30px_rgba(35,31,32,0.10)] ${rule}`}
    >
      {ticket.tag && (
        <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 -rotate-3">
          <span className="bg-k-rust px-3.5 py-[5px] font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-k-cream">
            {ticket.tag}
          </span>
        </div>
      )}
      <div className={`border-b border-dashed pb-3.5 text-center ${rule}`}>
        <span className="font-headline text-2xl uppercase tracking-[-0.01em] text-k-black">
          {ticket.title}
        </span>
        <br />
        <span className={`font-condensed text-[11px] uppercase tracking-[0.2em] ${meta}`}>
          EST 1997 · Ticket Nº {ticket.number}
        </span>
      </div>
      {steps.map((step, i) => (
        <div
          key={step._key}
          className={`flex items-baseline gap-4 py-3.5 ${i < steps.length - 1 ? `border-b border-dashed ${rule}` : ""}`}
        >
          <span className="shrink-0 font-condensed text-[13px] font-semibold tracking-[0.1em] text-k-rust">
            {step.marker}
          </span>
          <div>
            <div className="font-display text-[17px] font-bold tracking-[-0.01em] text-k-black">
              {step.title}
            </div>
            {step.body && (
              <p className="font-body text-sm leading-[1.45] text-k-maroon">{step.body}</p>
            )}
          </div>
        </div>
      ))}
      {ticket.footer && (
        <div className={`mt-0.5 border-t border-dashed pt-3 text-center ${rule}`}>
          <span className="font-body text-sm italic text-k-maroon">{ticket.footer}</span>
        </div>
      )}
    </div>
  );
}
