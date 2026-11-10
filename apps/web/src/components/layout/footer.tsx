import type { SiteSettings } from "@kneaders/content";
import { Container } from "../ui/container";
import { SmartLink } from "../ui/smart-link";
import { NewsletterForm } from "../ui/newsletter-form";
import { Wordmark } from "./wordmark";

/** Footer on the soft tan wash: logo, tagline and signup on the left, link columns on the right. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const f = settings.footer;
  return (
    <footer data-cms-block="site.footer" className="border-t border-k-line bg-k-wash">
      <Container className="pt-24 pb-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 flex flex-col items-start gap-6 md:col-span-5">
            <Wordmark href="" height={48} />
            {f.tagline?.length > 0 && (
              <p className="type-quote text-[clamp(22px,2vw,28px)]">{f.tagline.join(" ")}</p>
            )}
            <div className="flex w-full max-w-[420px] flex-col gap-3">
              {f.newsletterHeading && <span className="type-eyebrow text-k-ink-3">{f.newsletterHeading}</span>}
              {f.newsletterBody && <p className="type-small">{f.newsletterBody}</p>}
              <NewsletterForm placeholder={f.newsletterPlaceholder} variant="ink" />
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {f.columns.map((col) => (
              <div key={col._key} className="flex flex-col gap-4">
                <span className="type-eyebrow text-k-ink-3">{col.heading}</span>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l._key}>
                      <SmartLink href={l.href} className="nav-link">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[72px] flex flex-wrap items-center justify-between gap-4 border-t border-k-line pt-6">
          <span className="type-meta">{f.copyright}</span>
          <div className="type-meta flex flex-wrap gap-6">
            {f.legalLinks.map((l) => (
              <SmartLink key={l._key} href={l.href} className="transition-colors duration-200 hover:text-k-ink">
                {l.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
