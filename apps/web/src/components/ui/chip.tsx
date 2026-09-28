import type { ReactNode } from "react";
import { toneVars } from "@/lib/tones";

/** Hairline pill tag (`.hl-chip`). Pass a color to tint border + text. */
export function Chip({
  children,
  color,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-condensed text-[11px] uppercase tracking-[0.14em] ${
        color ? "border-(--chip) text-(--chip)" : "border-k-line text-k-ink-3"
      } ${className}`}
      style={color ? toneVars({ chip: color }) : undefined}
    >
      {children}
    </span>
  );
}
