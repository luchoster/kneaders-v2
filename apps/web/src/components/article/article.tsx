import Link from "next/link";
import type { PostDetail } from "@kneaders/content";
import { formatDate } from "@/lib/format";
import { Chip } from "../ui/chip";
import { Container } from "../ui/container";
import { Eyebrow } from "../ui/eyebrow";
import { FrameImage } from "../ui/frame-image";
import { ArticleBody, articleHeadings } from "./article-body";
import { ShareButtons } from "./share-buttons";

const meta = "font-condensed text-[11px] uppercase tracking-[0.14em] text-k-ink-3";

/** Journal article template (editorial density). */
export function Article({ post }: { post: PostDetail }) {
  const headings = articleHeadings(post.body);
  const initials = post.author
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  const date = formatDate(post.publishedAt);

  return (
    <div className="density-editorial">
      <section data-cms-block="article.hero" className="relative bg-k-bg">
        <Container>
          <div className="pt-8 pb-4">
            <Link href="/journal" className={meta}>
              ← Back to Journal
            </Link>
          </div>
          <div className="max-w-4xl pt-6 pb-12">
            <div className="flex items-center gap-3">
              <Chip color="#801B21">{post.tag}</Chip>
              <span className={meta}>
                {post.readTime} · {date}
              </span>
            </div>
            <h1 className="mt-7 max-w-[22ch] font-headline text-[clamp(40px,6.4vw,96px)] font-normal uppercase leading-[0.98] tracking-[0.01em] text-balance">
              {post.title}
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <div className="inline-flex size-11 items-center justify-center rounded-full border border-k-line bg-k-bg-warm font-display">
                <span className="text-base font-semibold">{initials}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold tracking-[-0.01em]">{post.author}</span>
                <span className="font-condensed text-[10px] uppercase tracking-[0.14em] text-k-ink-3">
                  {post.authorRole ?? "Contributor"}
                </span>
              </div>
            </div>
          </div>
          <FrameImage media={post.image} alt={post.title} ratio="21/9" eager sizes="(min-width: 1440px) 1440px, 100vw" />
        </Container>
      </section>

      <section data-cms-block="article.body" className="relative bg-k-bg py-(--k-section-y)">
        <Container>
          <article className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
            <aside className="col-span-12 self-start md:sticky md:top-24 md:col-span-3">
              {headings.length > 0 && (
                <>
                  <Eyebrow>In this piece</Eyebrow>
                  <ul className="mt-4 flex flex-col gap-2">
                    {headings.map((h) => (
                      <li key={h.key} className="font-body text-[13px] leading-[1.45] text-k-ink-2">
                        · {h.text}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-px bg-k-line" />
                </>
              )}
              <div className={`mt-6 ${meta}`}>Share</div>
              <ShareButtons title={post.title} />
            </aside>
            <div className="col-span-12 max-w-[68ch] font-body text-lg leading-[1.7] text-pretty text-k-black md:col-span-9">
              {post.body && <ArticleBody body={post.body} />}
              <div className="mt-16 h-px bg-k-line" />
              <p className={`mt-6 ${meta}`}>End · Filed under {post.tag}</p>
            </div>
          </article>
        </Container>
      </section>

      {post.related?.length > 0 && (
        <section data-cms-block="article.related" className="relative bg-k-bg-warm py-(--k-section-y)">
          <Container>
            <div className="mb-12 grid grid-cols-12 items-end gap-6">
              <div className="col-span-12 md:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="font-condensed text-xs tracking-[0.14em] text-k-ink-3">+</span>
                  <span className="h-px max-w-20 flex-1 bg-k-line" />
                  <Eyebrow>Read next</Eyebrow>
                </div>
                <h2 className="mt-3 font-display text-[clamp(28px,3.6vw,48px)] font-semibold leading-[0.98] tracking-[-0.02em]">
                  Three more from the bench.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-4 gap-y-8 md:gap-x-8">
              {post.related.map((p) => (
                <Link
                  key={p._id}
                  href={`/journal/${p.slug}`}
                  className="col-span-12 flex flex-col gap-3 sm:col-span-6 md:col-span-4"
                >
                  <FrameImage media={p.image} alt={p.title} ratio="5/4" />
                  <Chip className="self-start">{p.tag}</Chip>
                  <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.018em]">{p.title}</h3>
                  <span className="font-condensed text-[10px] uppercase tracking-[0.14em] text-k-ink-3">
                    {p.readTime} · {formatDate(p.publishedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
