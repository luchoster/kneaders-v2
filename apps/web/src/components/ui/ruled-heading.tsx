import type { ReactNode } from "react";
import type { Tone } from "@kneaders/content";
import { hex, toneVars } from "@/lib/tones";

/** `——— HEADING ———` centered between two colored rules. */
export function RuledHeading({
  children,
  tone,
  size = "default",
  className = "mb-12",
  nowrap = false,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "default" | "small" | "category";
  className?: string;
  nowrap?: boolean;
}) {
  const sizes = {
    default: "text-[clamp(28px,3.6vw,50px)]",
    small: "text-[clamp(28px,3.4vw,46px)]",
    category: "text-[clamp(34px,4vw,56px)] leading-[0.95]",
  };
  return (
    <div className={`flex items-center gap-5 ${className}`} style={toneVars({ rule: hex(tone, "maroon") })}>
      <div className="h-[3px] flex-1 rounded-[2px] bg-(--rule) opacity-85" />
      <h2
        className={`text-center font-headline uppercase tracking-[-0.01em] text-(--rule) ${sizes[size]} ${nowrap ? "whitespace-nowrap" : ""}`}
      >
        {children}
      </h2>
      <div className="h-[3px] flex-1 rounded-[2px] bg-(--rule) opacity-85" />
    </div>
  );
}
