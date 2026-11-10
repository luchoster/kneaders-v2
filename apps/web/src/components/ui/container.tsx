import type { ComponentProps } from "react";

/**
 * 1280px max with the fluid side gutter. `narrow` is the 760px column for
 * centered text; `wide` is the 1600px canvas the menu uses on large screens.
 */
export function Container({
  narrow = false,
  wide = false,
  className = "",
  ...props
}: ComponentProps<"div"> & { narrow?: boolean; wide?: boolean }) {
  return (
    <div
      className={`mx-auto w-full px-(--k-gutter) ${narrow ? "max-w-[760px]" : wide ? "max-w-[1600px]" : "max-w-[1280px]"} ${className}`}
      {...props}
    />
  );
}
