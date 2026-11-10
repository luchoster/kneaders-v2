import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@kneaders/content";

const text = (b: PortableTextBlock) => b.children.map((c) => c.text).join("");

/** Long-form article body: light italic lede, drop cap on the first paragraph, pull quotes. */
export function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  const firstParagraph = body.find((b) => b.style === "normal");
  const dropCap = body[0]?.style === "lede" ? firstParagraph?._key : undefined;

  const components: PortableTextComponents = {
    block: {
      lede: ({ children }) => (
        <p className="type-quote mb-8 text-[clamp(22px,2.2vw,30px)]">
          {children}
        </p>
      ),
      // Sanity's "h3" style is the first heading level below the page <h1>, so render it as <h2>
      // (same classes — no visual change) to keep the heading order logical.
      h3: ({ children }) => (
        <h2 className="type-h2-sm mt-14 mb-4">{children}</h2>
      ),
      blockquote: ({ children }) => (
        <blockquote className="type-quote my-12 max-w-[30ch] border-l border-k-accent pl-7 text-[clamp(24px,2.4vw,32px)]">
          {children}
        </blockquote>
      ),
      normal: ({ children, value }) => {
        if (value._key === dropCap) {
          const t = text(value as PortableTextBlock);
          return (
            <p className="mt-2">
              <span className="float-left mt-1.5 mr-3.5 font-display text-[64px] font-light leading-[0.85] text-k-ink">
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
