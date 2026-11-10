"use client";

import type { ReactNode } from "react";
import { Button as AriaButton, Link } from "react-aria-components";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full border font-body font-medium tracking-[0.01em] whitespace-nowrap cursor-pointer transition-colors duration-[250ms]";

const variants = {
  /** Brick red — the one primary action in a view. */
  primary: "border-transparent bg-k-accent text-k-bg hover:bg-k-accent-hover",
  ink: "border-transparent bg-k-ink text-k-bg hover:bg-[#3a3334]",
  /** Hairline outline for secondary actions. */
  quiet: "border-k-line-strong bg-transparent text-k-ink hover:border-k-ink",
} as const;

const sizes = {
  md: "px-[26px] py-3.5 text-[15px]",
  sm: "px-[22px] py-[11px] text-sm",
} as const;

export interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

/** Pill button; renders a link when given an `href`. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (!href) {
    return (
      <AriaButton type={type} onPress={onClick} className={cls}>
        {children}
      </AriaButton>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
