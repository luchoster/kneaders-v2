import type { SiteSettings } from "@kneaders/content";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { SmartLink } from "../ui/smart-link";
import { NewsletterForm } from "../ui/newsletter-form";
import { Wordmark } from "./wordmark";

export function Footer({ settings }: { settings: SiteSettings }) {
  const f = settings.footer;
  return (
    <footer data-cms-block="site.footer" data-tone="ink" className="bg-k-black text-k-bg">
      <Container className="pt-24 pb-12">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-5">
            <div className="mb-7">
              <Wordmark href="" height={64} inverted />
            </div>
            <div className="font-display text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-[-0.03em]">
              {f.tagline.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < f.tagline.length - 1 && <br />}
                </span>
              ))}
            </div>
            <div className="mt-10 max-w-md">
              <Eyebrow onDark>{f.newsletterHeading}</Eyebrow>
              <p className="mt-3 font-body text-[15px] leading-[1.55] text-k-bg opacity-85">
                {f.newsletterBody}
              </p>
              <NewsletterForm
                className="mt-5"
                placeholder={f.newsletterPlaceholder}
                inputClassName="border-[rgba(246,241,228,0.3)] text-k-bg"
                buttonClassName="bg-k-bg text-k-black"
              />
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            {f.columns.map((col) => (
              <div key={col._key}>
                <Eyebrow onDark>{col.heading}</Eyebrow>
                <ul className="mt-4 flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={l._key}>
                      <SmartLink href={l.href} className="font-display text-[15px] tracking-[-0.01em] text-k-bg">
                        <span className="link-anim">{l.label}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(246,241,228,0.18)] pt-6">
          <div className="font-condensed text-[11px] uppercase tracking-[0.14em] text-k-gold">{f.copyright}</div>
          <div className="flex gap-6 font-condensed text-[11px] uppercase tracking-[0.14em]">
            {f.legalLinks.map((l) => (
              <SmartLink key={l._key} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
