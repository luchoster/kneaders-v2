import type { FeaturedPostSection, Keyed } from "@kneaders/content";
import { formatDate } from "@/lib/format";
import { Container } from "../ui/container";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { TextLink } from "../ui/text-link";

/** Journal lead story — pinned post or the latest: large 4:3 photo beside the title and excerpt. */
export function FeaturedPost({
  post,
  ctaLabel = "Read the story",
  surface,
}: Keyed<FeaturedPostSection> & { surface?: Surface }) {
  if (!post) return null;
  return (
    <Section block="featuredPost" surface={surface}>
      <Container>
        <div className="group/card relative grid grid-cols-12 items-center gap-y-8 md:gap-x-16">
          <Reveal className="col-span-12 md:col-span-7">
            <Photo media={post.image} alt="" ratio="4/3" eager sizes="(min-width: 1280px) 640px, (min-width: 768px) 55vw, 100vw" />
          </Reveal>
          <Reveal delay={120} className="col-span-12 flex flex-col items-start gap-5 md:col-span-5">
            <span className="type-meta">
              {post.tag} · {post.readTime} · {formatDate(post.publishedAt)}
            </span>
            <h2 className="type-h2">{post.title}</h2>
            <p className="type-lede">{post.excerpt}</p>
            <span className="type-small italic">By {post.author}</span>
            <TextLink href={`/journal/${post.slug}`} stretched className="mt-2">
              {ctaLabel}
            </TextLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
