import type { SplitHeadline as SplitHeadlineData, Tone } from "@kneaders/content";
import { hex } from "@/lib/tones";

/** Renders a two-tone headline: `lead` + `rest`, each in its own brand tone. */
export function SplitHeadline({
  headline,
  leadTone,
  restTone,
}: {
  headline: SplitHeadlineData;
  /** Defaults used when the CMS leaves the tone empty. */
  leadTone?: Tone;
  restTone?: Tone;
}) {
  const lead = hex(headline.leadTone ?? leadTone, "black");
  const rest = hex(headline.restTone ?? restTone, "black");
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
