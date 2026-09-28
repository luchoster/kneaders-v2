"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@kneaders/content";
import { mediaSrc } from "@/lib/media";
import { toneVars } from "@/lib/tones";

/**
 * Squircle food shot sitting on a matching offset squircle "plate".
 * The plate color carries the style-guide category color-coding.
 */
export function Plate({
  media,
  alt,
  disc,
  eager = false,
  sizes = "(min-width: 768px) 40vw, 90vw",
  className = "",
}: {
  media?: Media | null;
  alt?: string;
  /** Any CSS color (palette hex or rgba). */
  disc: string;
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  const src = mediaSrc(media);
  const [errored, setErrored] = useState(!src);
  const label = alt ?? media?.alt ?? "";
  return (
    <div
      className={`relative aspect-square w-full drop-shadow-[0_14px_24px_rgba(35,31,32,0.20)] ${className}`}
    >
      <div className="mask-squircle absolute inset-[5%_-3%_-3%_5%] bg-(--disc)" style={toneVars({ disc })} />
      <div className="mask-squircle absolute inset-[0_3%_3%_0] overflow-hidden bg-k-tan-deep">
        {errored || !src ? (
          <div className="bg-placeholder absolute inset-0">
            <span className="absolute bottom-[38%] left-1/2 -translate-x-1/2 font-condensed text-[11px] uppercase tracking-[0.14em] text-k-ink-3">
              {label}
            </span>
          </div>
        ) : (
          <Image
            src={src}
            alt={label}
            fill
            sizes={sizes}
            priority={eager}
            className="object-cover"
            onError={() => setErrored(true)}
          />
        )}
      </div>
    </div>
  );
}
