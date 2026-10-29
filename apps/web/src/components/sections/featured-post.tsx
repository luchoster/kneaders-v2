import { journalTagTone, type FeaturedPostSection, type Keyed } from "@kneaders/content";
import { hex } from "@/lib/tones";
import { formatDate } from "@/lib/format";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Photo } from "../ui/photo";
import { Sticker } from "../ui/sticker";

/** Journal lead story — pinned post or the latest. */
export function FeaturedPost({ post, sticker, ctaLabel = "Read the story" }: Keyed<FeaturedPostSection>) {
  if (!post) return null;
  const color = hex(journalTagTone(post.tag), "brown");
  return (
    <section data-cms-block="featuredPost" className="bg-k-tan py-[72px]">
      <Container className="grid grid-cols-12 items-center gap-x-4 gap-y-10 md:gap-x-10">
        <div className="relative col-span-12 md:col-span-5">
          <Photo media={post.image} alt="" eager />
          {sticker && (
            <div className="absolute top-4 right-4">
              <Sticker>
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
          <p className="max-w-[560px] font-body text-lg leading-[1.55] text-pretty text-k-ink-2">{post.excerpt}</p>
          <span className="font-body text-sm italic text-k-brown">{post.author}</span>
          <Button href={`/journal/${post.slug}`} tone="black" ink="tan" arrow className="mt-1">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
