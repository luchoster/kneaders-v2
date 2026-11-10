import type { Keyed, PostCard as PostCardData, PostGridSection } from "@kneaders/content";
import { Container } from "../ui/container";
import { Intro } from "../ui/intro";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section, type Surface } from "../ui/section";
import { SmartLink } from "../ui/smart-link";

/** Journal card: 4:3 photo, meta line, title (the link, stretched over the card), optional excerpt. */
export function PostCard({ post, excerpt = false }: { post: PostCardData; excerpt?: boolean }) {
  return (
    <article className="group/card relative flex flex-col gap-4">
      {/* The title below names the story, so the photo is decorative. */}
      <Photo media={post.image} alt="" ratio="4/3" />
      <span className="type-meta">
        {post.tag} · {post.readTime}
      </span>
      <h3 className="type-h3">
        <SmartLink
          href={`/journal/${post.slug}`}
          className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] group-hover/card:text-k-accent"
        >
          {post.title}
        </SmartLink>
      </h3>
      {excerpt && post.excerpt && <p className="type-small line-clamp-2">{post.excerpt}</p>}
    </article>
  );
}

/** Journal archive grid: three columns of photo cards. */
export function PostGrid({ heading, offset = 0, posts = [], surface }: Keyed<PostGridSection> & { surface?: Surface }) {
  const list = posts.slice(offset);
  return (
    <Section block="postGrid" surface={surface}>
      <Container>
        {heading && <Intro title={heading} className="mb-14" />}
        {list.length === 0 ? (
          <p className="type-lede text-center">More stories coming soon.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal as="li" key={p._id} delay={(i % 3) * 80}>
                <PostCard post={p} excerpt />
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
