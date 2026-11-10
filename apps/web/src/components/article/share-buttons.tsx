"use client";

import { useState } from "react";
import { Button } from "react-aria-components";

const btn =
  "cursor-pointer rounded-full border border-k-line-strong bg-transparent px-3.5 py-1.5 font-body text-[13px] font-medium text-k-ink transition-colors duration-[250ms] hover:border-k-ink";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div role="group" aria-label="Share this article" className="mt-3 flex flex-wrap gap-2">
      <Button
        className={btn}
        onPress={async () => {
          await navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Copy link"}
      </Button>
      <Button
        className={btn}
        onPress={() => {
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
        }}
      >
        Email
      </Button>
      <Button className={btn} onPress={() => window.print()}>
        Print
      </Button>
      <span role="status" className="sr-only">
        {copied && "Link copied to clipboard."}
      </span>
    </div>
  );
}
