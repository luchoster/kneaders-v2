import type { Keyed, NewsletterBandSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { NewsletterForm } from "../ui/newsletter-form";
import { SplitHeadline } from "../ui/split-headline";

/** Black newsletter sign-up band. */
export function NewsletterBand({ headline, body, placeholder, buttonLabel }: Keyed<NewsletterBandSection>) {
  return (
    <section data-cms-block="newsletterBand" data-tone="ink" className="bg-k-black py-20">
      <Container className="grid grid-cols-12 items-center gap-x-4 gap-y-8 md:gap-x-8">
        <div className="col-span-12 md:col-span-7">
          <h2 className="font-headline text-[clamp(32px,4.4vw,60px)] uppercase leading-[0.95] tracking-[-0.01em] text-balance">
            <SplitHeadline headline={headline} leadTone="tan" restTone="gold" />
          </h2>
          {body && <p className="mt-4 max-w-[480px] font-body text-base leading-normal text-k-tan-deep">{body}</p>}
        </div>
        <div className="col-span-12 md:col-span-5">
          <NewsletterForm
            placeholder={placeholder}
            buttonLabel={buttonLabel}
            inputClassName="border-[rgba(239,225,197,0.35)] text-k-tan"
            buttonClassName="bg-k-gold text-k-black"
          />
        </div>
      </Container>
    </section>
  );
}
