import type { FormSection as FormSectionData, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { SplitHeadline } from "../ui/split-headline";
import { Ticket } from "../ui/ticket";
import { InquiryForm } from "../ui/inquiry-form";

/** Heading + intro on the left, a configurable form card on the right. */
export function FormSection({
  anchorId,
  background = "tan",
  formId,
  headline,
  body,
  contactLine,
  ticket,
  fields,
  submitLabel,
  submitTone = "red",
}: Keyed<FormSectionData>) {
  const tan = background === "tan";
  return (
    <section
      id={anchorId}
      data-cms-block="formSection"
      className={`scroll-mt-[90px] pt-20 pb-[88px] ${tan ? "bg-k-tan" : "bg-k-cream"}`}
    >
      <Container className={`grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-10 ${ticket ? "items-start" : ""}`}>
        <div className={`col-span-12 flex flex-col md:col-span-5 ${ticket ? "gap-5" : "gap-4"}`}>
          <h2 className="font-headline text-[clamp(30px,3.8vw,52px)] uppercase leading-[0.95] tracking-[-0.01em]">
            <SplitHeadline headline={headline} leadTone="black" restTone="rust" />
          </h2>
          {body && (
            <p className={`font-body text-base leading-[1.55] text-pretty text-k-maroon ${ticket ? "max-w-[400px]" : ""}`}>
              {body}
            </p>
          )}
          {contactLine && (
            <div className="font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-k-rust">
              {contactLine}
            </div>
          )}
          {ticket && <Ticket ticket={ticket} />}
        </div>
        <InquiryForm
          formId={formId}
          fields={fields}
          submitLabel={submitLabel}
          submitTone={submitTone}
          className={`col-span-12 md:col-span-7 ${tan ? "bg-k-cream" : "bg-k-tan"}`}
        />
      </Container>
    </section>
  );
}
