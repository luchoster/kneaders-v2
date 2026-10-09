import { journalTagTone, palette, type FeaturedPostSection, type Keyed } from "@kneaders/content";
import { formatDate } from "@/lib/format";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Plate } from "../ui/plate";
import { Sticker } from "../ui/sticker";

/** Journal lead story — pinned post or the latest. */
export function FeaturedPost({ post, sticker, ctaLabel = "Read the story" }: Keyed<FeaturedPostSection>) {
  if (!post) return null;
  const color = palette[journalTagTone(post.tag)];
  return (
    <section data-cms-block="featuredPost" className="bg-k-tan py-[72px]">
      <Container className="grid grid-cols-12 items-center gap-x-4 gap-y-10 md:gap-x-10">
        <div className="relative col-span-12 md:col-span-5">
          <Plate media={post.image} alt="" disc={color} eager />
          {sticker && (
            <div className="absolute top-2.5 right-1.5">
              <Sticker tone={sticker.tone ?? "red"} textTone={sticker.textTone ?? "tan"} rotate={7}>
                {sticker.text}
              </Sticker>
            </div>
          )}
        </div>
        <div className="col-span-12 flex flex-col items-start gap-4 md:col-span-7">
          <span className="font-condensed text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color }}>
            {post.tag} · {post.readTime} · {formatDate(post.publishedAt)}
          </span>
          <h2 className="font-headline text-[clamp(30px,3.6vw,54px)] uppercase leading-[0.98] tracking-[-0.01em] text-balance text-k-black">
            {post.title}
          </h2>
          <p className="max-w-[560px] font-body text-lg leading-[1.55] text-pretty text-k-maroon">{post.excerpt}</p>
          <span className="font-body text-sm italic text-k-rust">{post.author}</span>
          <Button href={`/journal/${post.slug}`} tone="black" ink="tan" arrow className="mt-1">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
