import type { ComponentProps } from "react";

/** 1440px max, density-driven side gutter (`.hl-container`). */
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-[1440px] px-(--k-gutter) ${className}`} {...props} />;
}
