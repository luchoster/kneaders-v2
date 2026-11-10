import type { Keyed, NewsletterBandSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Headline } from "../ui/headline";
import { NewsletterForm } from "../ui/newsletter-form";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";

/** Newsletter sign-up: a centered heading, one line of copy, and the email pill. */
export function NewsletterBand({
  headline,
  body,
  placeholder,
  buttonLabel,
  surface,
}: Keyed<NewsletterBandSection> & { surface?: Surface }) {
  return (
    <Section block="newsletterBand" surface={surface} size="small">
      <Container narrow>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="type-h2">
            <Headline headline={headline} />
          </h2>
          {body && <p className="type-lede max-w-[460px]">{body}</p>}
          <NewsletterForm placeholder={placeholder} buttonLabel={buttonLabel} className="w-full max-w-[440px]" />
        </Reveal>
      </Container>
    </Section>
  );
}
