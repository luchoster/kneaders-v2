import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@kneaders/content";

/** Short-form Portable Text (descriptions). Paragraphs inherit the wrapper's type styles. */
const components: PortableTextComponents = {
  block: { normal: ({ children }) => <p className="[&+p]:mt-3">{children}</p> },
  list: { bullet: ({ children }) => <ul className="mt-3 list-disc pl-5">{children}</ul> },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} className="underline underline-offset-[3px]">
        {children}
      </a>
    ),
  },
};

export function RichText({ value, className }: { value?: PortableTextBlock[] | null; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
