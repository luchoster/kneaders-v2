import type { ReactNode } from "react";
import type { Tone } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";

/** Rotated menu-board sticker (Amnesia caps on a brand block). */
export function Sticker({
  children,
  tone,
  textTone,
  rotate = -6,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  textTone?: Tone;
  rotate?: number;
  size?: "md" | "sm" | "xs" | "tag";
  className?: string;
}) {
  const sizes = {
    md: "px-3.5 py-2 text-[13px]",
    sm: "px-3.5 py-2 text-[12px]",
    xs: "px-2.5 py-1.5 text-[11px]",
    tag: "px-3 py-1.5 text-[12px]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-(--st-bg) font-headline uppercase tracking-[0.04em] text-(--st-fg) shadow-[0_2px_0_rgba(35,31,32,0.18)] ${sizes[size]} ${className}`}
      style={{
        ...toneVars({ "st-bg": hex(tone, "gold"), "st-fg": hex(textTone, "black") }),
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </span>
  );
}
