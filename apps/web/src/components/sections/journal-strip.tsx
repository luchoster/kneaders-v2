import type { JournalStripSection, Keyed } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { FrameImage } from "../ui/frame-image";
import { Lift } from "../ui/lift";
import { SplitHeadline } from "../ui/split-headline";

/** Home 06 — latest journal posts on a tan field. */
export function JournalStrip({ headline, cta, limit = 3, posts = [] }: Keyed<JournalStripSection>) {
  return (
    <section data-cms-block="journalStrip" className="bg-k-tan py-[88px]">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-headline text-[clamp(32px,4.2vw,56px)] uppercase leading-[0.95] tracking-[-0.01em]">
            <SplitHeadline headline={headline} leadTone="maroon" restTone="red" />
          </h2>
          {cta && (
            <Button href={cta.href} tone="black" ink="tan" arrow>
              {cta.label}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-12 gap-6">
          {posts.slice(0, limit).map((p, i) => (
            <Lift
              key={p._id}
              href={`/journal/${p.slug}`}
              y={-6}
              rotate={i % 2 ? 1 : -1}
              className="col-span-12 flex flex-col gap-4 rounded-[20px] bg-k-cream p-4 shadow-[0_8px_24px_rgba(35,31,32,0.08)] md:col-span-4"
            >
              <FrameImage media={p.image} label={p.tag} ratio="5/4" className="rounded-xl" />
              <div className="flex items-center gap-3 px-1">
                <span className="font-condensed text-xs font-semibold uppercase tracking-[0.16em] text-k-rust">
                  {p.tag} · {p.readTime}
                </span>
              </div>
              <h3 className="px-1 pb-2 font-display text-[21px] font-bold leading-[1.2] tracking-[-0.01em] text-balance text-k-black">
                {p.title}
              </h3>
            </Lift>
          ))}
        </div>
      </Container>
    </section>
  );
}
