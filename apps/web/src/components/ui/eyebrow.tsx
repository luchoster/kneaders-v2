import type { ReactNode } from "react";

/** Menu-board category label on a filled brand block (`.hl-eyebrow`). */
export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-[2px] px-2.5 pt-[5px] pb-1 font-condensed text-xs font-medium uppercase tracking-[0.18em] ${
        onDark ? "bg-k-gold text-k-black" : "bg-k-red text-k-tan"
      } ${className}`}
    >
      {children}
    </span>
  );
}
