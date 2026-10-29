import type { SplitHeadline as SplitHeadlineData, Tone } from "@kneaders/content";
import { hex, isLightField } from "@/lib/tones";

/**
 * Renders a two-tone headline: `lead` + `rest`, each in its own brand tone.
 * A CMS tone that would vanish into the section (dark text on a dark section,
 * light text on a light one) falls back to the section's default.
 */
export function SplitHeadline({
  headline,
  leadTone,
  restTone,
  onDark = false,
}: {
  headline: SplitHeadlineData;
  /** Defaults used when the CMS leaves the tone empty. */
  leadTone?: Tone;
  restTone?: Tone;
  onDark?: boolean;
}) {
  const pick = (cms: Tone | undefined, fallback: Tone | undefined) => {
    const base = fallback ?? (onDark ? "tan" : "black");
    return hex(cms && isLightField(cms, base) === onDark ? cms : base, base);
  };
  const lead = pick(headline.leadTone, leadTone);
  const rest = pick(headline.restTone, restTone);
  return (
    <>
      <span style={{ color: lead }}>{headline.lead}</span>
      {headline.rest && (
        <>
          {headline.stacked ? <br /> : " "}
          <span style={{ color: rest }}>{headline.rest}</span>
        </>
      )}
    </>
  );
}
