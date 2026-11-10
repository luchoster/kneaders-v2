import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

/** Section intro: eyebrow, H2, optional lede and action. Left-aligned or centered. */
export function Intro({
  eyebrow,
  title,
  lede,
  action,
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${center ? "mx-auto max-w-[620px] items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="type-h2 max-w-[620px]">{title}</h2>
      {lede && <p className="type-lede max-w-[560px]">{lede}</p>}
      {action}
    </div>
  );
}
