import type { FormSection as FormSectionData, Keyed } from "@kneaders/content";
import { Container } from "../ui/container";
import { Headline } from "../ui/headline";
import { InquiryForm } from "../ui/inquiry-form";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { Steps } from "../ui/steps";

/** Heading, intro and any notes on the left; the CMS-configured form on the right. */
export function FormSection({
  anchorId,
  formId,
  headline,
  body,
  contactLine,
  ticket,
  fields,
  submitLabel,
  surface,
}: Keyed<FormSectionData> & { surface?: Surface }) {
  return (
    <Section id={anchorId} block="formSection" surface={surface} className="scroll-mt-[90px]">
      <Container className="grid grid-cols-12 gap-y-12 md:gap-x-16">
        <Reveal className="col-span-12 flex flex-col gap-5 md:col-span-4">
          <h2 className="type-h2">
            <Headline headline={headline} />
          </h2>
          {body && <p className="type-body">{body}</p>}
          {contactLine && <p className="type-small text-k-ink">{contactLine}</p>}
          {ticket && <Steps ticket={ticket} className="mt-6" />}
        </Reveal>
        <InquiryForm
          formId={formId}
          fields={fields}
          submitLabel={submitLabel}
          className="col-span-12 self-start md:col-span-7 md:col-start-6"
        />
      </Container>
    </Section>
  );
}
