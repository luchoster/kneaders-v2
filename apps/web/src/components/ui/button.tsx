import Link from "next/link";
import type { ReactNode } from "react";
import type { Tone } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";

const base =
  "inline-flex items-center gap-2 px-5 py-3 rounded-full font-display font-bold text-[13px] leading-normal tracking-[0.04em] uppercase whitespace-nowrap cursor-pointer transition-[transform,background-color,color,border-color] duration-200";

const variants = {
  /** Brand-colored pill (colors come from props). */
  solid: "bg-(--btn-bg) text-(--btn-fg) hover:text-(--btn-fg)",
  /** `.hl-btn-ghost` — 1px outline that fills on hover. */
  outline:
    "border border-(--btn-fg) bg-transparent text-(--btn-fg) hover:bg-(--btn-fg) hover:text-(--btn-bg)",
  /** `.hl-btn-primary` — nav "Order Now". */
  primary: "bg-k-black text-k-bg hover:bg-k-brown hover:text-k-bg",
} as const;

export interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  /** Background (solid) — or the hover fill text color (outline). */
  tone?: Tone;
  /** Text color (solid) — or the outline color (outline). */
  ink?: Tone;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function Button({
  href,
  children,
  variant = "solid",
  tone,
  ink,
  arrow,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const style =
    variant === "outline"
      ? toneVars({ "btn-fg": hex(ink, "black"), "btn-bg": hex(tone, "cream") })
      : variant === "solid"
        ? toneVars({ "btn-bg": hex(tone, "black"), "btn-fg": hex(ink, "tan") })
        : undefined;
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden>→</span>}
    </>
  );
  if (!href) {
    return (
      <button type={type} onClick={onClick} className={cls} style={style}>
        {content}
      </button>
    );
  }
  const internal = href.startsWith("/") || href.startsWith("#");
  return internal ? (
    <Link href={href} className={cls} style={style}>
      {content}
    </Link>
  ) : (
    <a href={href} className={cls} style={style}>
      {content}
    </a>
  );
}
