import type { ReactNode } from "react";

/** Small uppercase label above a heading: plain rust text, no fill. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`type-eyebrow ${className}`}>{children}</span>;
}
