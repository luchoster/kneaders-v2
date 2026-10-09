import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@kneaders/content";

const text = (b: PortableTextBlock) => b.children.map((c) => c.text).join("");

/** Long-form article body: italic lede, drop cap on the first paragraph, pull quotes. */
export function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  const firstParagraph = body.find((b) => b.style === "normal");
  const dropCap = body[0]?.style === "lede" ? firstParagraph?._key : undefined;

  const components: PortableTextComponents = {
    block: {
      lede: ({ children }) => (
        <p className="mb-8 font-body text-[clamp(20px,2vw,26px)] font-medium italic leading-[1.35] tracking-[-0.01em] text-k-black">
          {children}
        </p>
      ),
      // Sanity's "h3" style is the first heading level below the page <h1>, so render it as <h2>
      // (same classes — no visual change) to keep the heading order logical.
      h3: ({ children }) => (
        <h2 className="mt-12 mb-3 font-display text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.018em]">{children}</h2>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-10 max-w-[36ch] border-l-[3px] border-k-red pl-6 font-body text-[clamp(24px,2.4vw,32px)] italic leading-[1.25] tracking-[-0.01em] text-k-black">
          {children}
        </blockquote>
      ),
      normal: ({ children, value }) => {
        if (value._key === dropCap) {
          const t = text(value as PortableTextBlock);
          return (
            <p className="mt-2">
              <span className="float-left mt-1 mr-3.5 font-display text-[64px] font-semibold leading-[0.85] tracking-[-0.02em]">
                {t[0]}
              </span>
              {t.slice(1)}
            </p>
          );
        }
        return <p className="mt-5">{children}</p>;
      },
    },
  };

  return <PortableText value={body} components={components} />;
}

export const articleHeadings = (body: PortableTextBlock[] = []) =>
  body.filter((b) => b.style === "h3").map((b) => ({ key: b._key, text: text(b) }));
