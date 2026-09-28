"use client";

import { useState } from "react";

const btn =
  "cursor-pointer rounded-full border border-k-line bg-transparent px-2.5 py-1.5 font-condensed text-[10px] uppercase tracking-[0.14em]";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-3 flex gap-2">
      <button
        type="button"
        className={btn}
        onClick={async () => {
          await navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
        }}
      >
        {copied ? "Copied" : "Copy link"}
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => {
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
        }}
      >
        Email
      </button>
      <button type="button" className={btn} onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
}
