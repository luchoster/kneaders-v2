import { journalTagTone, palette, type Keyed, type PostGridSection } from "@kneaders/content";
import { formatDate } from "@/lib/format";
import { Container } from "../ui/container";
import { FrameImage } from "../ui/frame-image";
import { Lift } from "../ui/lift";
import { RuledHeading } from "../ui/ruled-heading";

/** Journal archive grid. */
export function PostGrid({ heading, offset = 0, posts = [] }: Keyed<PostGridSection>) {
  const list = posts.slice(offset);
  return (
    <section data-cms-block="postGrid" className="bg-k-cream pt-20 pb-[88px]">
      <Container>
        <RuledHeading size="small">{heading}</RuledHeading>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {list.map((p, i) => {
            const color = palette[journalTagTone(p.tag)];
            return (
              <Lift
                key={p._id}
                href={`/journal/${p.slug}`}
                y={-6}
                rotate={i % 2 ? 0.8 : -0.8}
                className="col-span-12 flex flex-col gap-4 rounded-[20px] border border-k-line bg-k-cream p-4 sm:col-span-6 lg:col-span-4"
              >
                <FrameImage media={p.image} label={p.tag} ratio="5/4" className="rounded-xl" />
                <div className="flex items-center justify-between px-1">
                  <span className="font-condensed text-xs font-semibold uppercase tracking-[0.16em]" style={{ color }}>
                    {p.tag} · {p.readTime}
                  </span>
                  <span className="font-condensed text-[11px] text-k-ink-3">{formatDate(p.publishedAt)}</span>
                </div>
                <h3 className="px-1 font-display text-[21px] font-bold leading-[1.2] tracking-[-0.01em] text-balance text-k-black">
                  {p.title}
                </h3>
                <p className="px-1 pb-2 font-body text-sm leading-normal text-pretty text-k-maroon">{p.excerpt}</p>
              </Lift>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
