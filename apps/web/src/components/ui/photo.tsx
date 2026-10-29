"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@kneaders/content";
import { mediaSrc } from "@/lib/media";
import { toneVars } from "@/lib/tones";

/**
 * Square photo, shown whole. Its shape follows the site-wide `--photo-radius`
 * (square by default, a circle when the photo-shape toggle is on).
 * `mat` puts a solid color border around the photo (the menu's category colors).
 */
export function Photo({
  media,
  alt,
  mat,
  eager = false,
  sizes = "(min-width: 768px) 40vw, 90vw",
  className = "",
}: {
  media?: Media | null;
  alt?: string;
  /** Any CSS color. */
  mat?: string;
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  const src = mediaSrc(media);
  const [errored, setErrored] = useState(!src);
  const label = alt ?? media?.alt ?? "";
  return (
    <div
      className={`photo-shape relative aspect-square w-full overflow-hidden ${mat ? "bg-(--mat) p-2" : "bg-k-bg-deep"} ${className}`}
      style={mat ? toneVars({ mat }) : undefined}
    >
      <div className="photo-shape relative size-full overflow-hidden bg-k-bg-deep">
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
