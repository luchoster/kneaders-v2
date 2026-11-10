import type { SplitHeadline } from "@kneaders/content";

/**
 * A CMS split headline in the v3 pattern: one plain clause (`lead`) and one
 * short italic accent phrase (`rest`). The stored tones are not used; the
 * accent color comes from the heading style (`type-h1` … `type-h3`).
 */
export function Headline({ headline }: { headline: SplitHeadline }) {
  return (
    <>
      {headline.lead}
      {headline.rest && (
        <>
          {headline.stacked ? <br /> : " "}
          <em>{headline.rest}</em>
        </>
      )}
    </>
  );
}

/** The headline as plain text, for alt text and labels. */
export const headlineText = (headline: SplitHeadline) => [headline.lead, headline.rest].filter(Boolean).join(" ");
