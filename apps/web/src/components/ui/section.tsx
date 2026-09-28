import type { ComponentProps } from "react";

/** Section wrapper carrying the CMS block name (`data-cms-block`) for handoff/debugging. */
export function Section({
  block,
  dark = false,
  className = "",
  ...props
}: ComponentProps<"section"> & { block: string; dark?: boolean }) {
  return (
    <section
      data-cms-block={block}
      data-tone={dark ? "ink" : undefined}
      className={`relative ${className}`}
      {...props}
    />
  );
}
