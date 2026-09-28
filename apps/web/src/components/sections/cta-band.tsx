import type { CtaBandSection, Keyed } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { SplitHeadline } from "../ui/split-headline";

/** Loud closing band (menu "Hungry yet?", story "Taste what the fuss is about"). */
export function CtaBand({
  headline,
  size = "large",
  tone = "red",
  primaryCta,
  secondaryCta,
  secondaryStyle = "solid",
}: Keyed<CtaBandSection>) {
  return (
    <section
      data-cms-block="ctaBand"
      data-tone="ink"
      className="bg-(--band) py-20 text-center"
      style={toneVars({ band: hex(tone, "red") })}
    >
      <Container className="flex flex-col items-center gap-6">
        <h2
          className={`font-headline uppercase leading-[0.95] tracking-[-0.01em] text-balance ${
            size === "large" ? "text-[clamp(36px,5vw,72px)]" : "text-[clamp(34px,4.6vw,66px)]"
          }`}
        >
          <SplitHeadline headline={headline} leadTone="tan" restTone="gold" />
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {primaryCta && (
            <Button href={primaryCta.href} tone="tan" ink={tone} arrow>
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta &&
            (secondaryStyle === "outline" ? (
              <Button href={secondaryCta.href} variant="outline" ink="tan" tone={tone}>
                {secondaryCta.label}
              </Button>
            ) : (
              <Button href={secondaryCta.href} tone="black" ink="tan">
                {secondaryCta.label}
              </Button>
            ))}
        </div>
      </Container>
    </section>
  );
}
