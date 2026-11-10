"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Fade + 14px rise when the element scrolls into view (`.reveal` in globals.css).
 * `immediate` plays the same entrance on load in pure CSS, for above-the-fold
 * content that shouldn't wait for hydration. Both are disabled under
 * `prefers-reduced-motion`, and a <noscript> rule in the root layout keeps
 * everything visible without JavaScript.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  immediate = false,
  className = "",
  style,
  children,
}: {
  as?: "div" | "li";
  /** Stagger, in milliseconds. */
  delay?: number;
  immediate?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (immediate || !el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const timing = delay ? (immediate ? { animationDelay: `${delay}ms` } : { transitionDelay: `${delay}ms` }) : undefined;

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-in={shown ? "" : undefined}
      className={`${immediate ? "reveal-now" : "reveal"} ${className}`}
      style={{ ...timing, ...style }}
    >
      {children}
    </Tag>
  );
}
