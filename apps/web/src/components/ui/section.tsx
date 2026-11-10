import type { ComponentProps } from "react";

/** Sections sit on cream or white only; the page builder alternates them. */
export type Surface = "cream" | "white";

const surfaces: Record<Surface, string> = {
  cream: "bg-k-bg [--k-field:#ffffff]",
  // Inputs flip to cream so they still read as fields on a white section.
  white: "bg-white [--k-field:var(--color-k-bg)]",
};

const spacing = {
  default: "py-(--k-section-y)",
  small: "py-(--k-section-sm-y)",
  none: "",
} as const;

/** Section wrapper: surface, vertical rhythm, and the CMS block name (`data-cms-block`) for debugging. */
export function Section({
  block,
  surface = "cream",
  size = "default",
  className = "",
  ...props
}: ComponentProps<"section"> & { block: string; surface?: Surface; size?: keyof typeof spacing }) {
  return (
    <section
      data-cms-block={block}
      className={`relative ${surfaces[surface]} ${spacing[size]} ${className}`}
      {...props}
    />
  );
}
