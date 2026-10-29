import type { ReactNode } from "react";

const variants = {
  brown: "bg-k-brown text-k-cream",
  cream: "bg-k-cream text-k-black",
  black: "bg-k-black text-k-cream",
} as const;

export type StickerVariant = keyof typeof variants;

/** Flat label tag (Amnesia caps). One look site-wide; `variant` only flips it for contrast. */
export function Sticker({
  children,
  variant = "brown",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  variant?: StickerVariant;
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
      className={`inline-flex items-center rounded-md font-headline uppercase tracking-[0.04em] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
