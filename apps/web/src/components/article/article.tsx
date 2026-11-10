import type { PostDetail } from "@kneaders/content";
import { formatDate } from "@/lib/format";
import { PostCard } from "../sections/post-grid";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { Photo } from "../ui/photo";
import { Reveal } from "../ui/reveal";
import { Section } from "../ui/section";
import { SmartLink } from "../ui/smart-link";
import { ArticleBody, articleHeadings } from "./article-body";
import { ShareButtons } from "./share-buttons";

/** Journal article template: centered intro, one wide photograph, then the long read. */
export function Article({ post }: { post: PostDetail }) {
  const headings = articleHeadings(post.body);
  const date = formatDate(post.publishedAt);

  return (
    <>
      <Section block="article.hero" size="none">
        <Container narrow className="pt-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,80px)]">
          <Reveal immediate className="flex flex-col items-center gap-6 text-center">
            <SmartLink href="/journal" className="type-meta transition-colors duration-200 hover:text-k-ink">
              ← Back to Journal
            </SmartLink>
            <Eyebrow>
              {post.tag} · {post.readTime} · {date}
            </Eyebrow>
            <h1 className="type-h1">{post.title}</h1>
            <p className="type-small italic">
              By {post.author}
              {post.authorRole && `, ${post.authorRole}`}
            </p>
          </Reveal>
        </Container>
        <Container>
          <Reveal immediate delay={120}>
            <Photo
              media={post.image}
              alt={post.image?.alt ?? ""}
              ratio="21/9"
              className="max-md:aspect-[3/2]"
              eager
              sizes="(min-width: 1280px) 1136px, 90vw"
            />
          </Reveal>
        </Container>
      </Section>

      <Section block="article.body">
        <Container>
          <article className="grid grid-cols-12 gap-y-12 md:gap-x-16">
            <aside className="col-span-12 self-start md:sticky md:top-[120px] md:col-span-3">
              {headings.length > 0 && (
                <>
                  <Eyebrow>In this piece</Eyebrow>
                  <ul className="mt-4 flex flex-col border-b border-k-line">
                    {headings.map((h) => (
                      <li key={h.key} className="type-small border-t border-k-line py-3">
                        {h.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className={`type-eyebrow text-k-ink-3 ${headings.length > 0 ? "mt-8" : ""}`}>Share</div>
              <ShareButtons title={post.title} />
            </aside>
            <div className="col-span-12 max-w-[68ch] font-body text-lg leading-[1.7] text-pretty text-k-ink-2 md:col-span-8 md:col-start-5">
              {post.body && <ArticleBody body={post.body} />}
              <p className="type-meta mt-16 border-t border-k-line pt-6">Filed under {post.tag}</p>
            </div>
          </article>
        </Container>
      </Section>

      {post.related?.length > 0 && (
        <Section block="article.related" surface="white">
          <Container>
            <div className="mb-14 flex flex-col items-start gap-5">
              <Eyebrow>Read next</Eyebrow>
              <h2 className="type-h2">Three more from the bench.</h2>
            </div>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
              {post.related.map((p, i) => (
                <Reveal as="li" key={p._id} delay={i * 90}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
