import type { Ticket } from "@kneaders/content";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";

/** "— thank you, come hungry —" → "thank you, come hungry": the dashes belonged to the old ticket card. */
const plain = (text: string) => text.replace(/^[\s—–-]+|[\s—–-]+$/g, "");

/**
 * A CMS "ticket" (steps, perks, a timeline, opening hours) as a hairline list:
 * the marker in italic accent, then the title and body. `heading` is the level
 * of each row's title, so the list fits the outline of wherever it sits.
 */
export function Steps({
  ticket,
  heading: Heading = "h3",
  className = "",
}: {
  ticket: Ticket;
  heading?: "h3" | "h4";
  className?: string;
}) {
  const steps = ticket.steps ?? [];
  const footer = ticket.footer && plain(ticket.footer);
  return (
    <div className={`flex flex-col ${className}`}>
      {ticket.title && <Eyebrow className="mb-4">{ticket.title}</Eyebrow>}
      <ol className="flex flex-col">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step._key}
            delay={i * 70}
            className="grid grid-cols-[minmax(3rem,max-content)_1fr] gap-x-6 border-t border-k-line py-6"
          >
            <span className="type-numeral">{step.marker}</span>
            <div className="flex flex-col gap-1.5">
              <Heading className="type-h4">{step.title}</Heading>
              {step.body && <p className="type-body">{step.body}</p>}
            </div>
          </Reveal>
        ))}
      </ol>
      {footer && <p className="type-meta border-t border-k-line pt-4">{footer}</p>}
    </div>
  );
}
