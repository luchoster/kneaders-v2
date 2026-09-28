"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@kneaders/content";
import { mediaSrc } from "@/lib/media";

/** Rectangular image frame with striped placeholder + hover zoom (`HLImage`). */
export function FrameImage({
  media,
  alt = "",
  label,
  ratio = "5/4",
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  eager = false,
}: {
  media?: Media | null;
  alt?: string;
  label?: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const src = mediaSrc(media, 1600);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(!src);
  const zoom =
    "transition-transform duration-[550ms] ease-k group-hover/frame:scale-[1.04]";
  return (
    <div
      className={`group/frame relative overflow-hidden bg-k-bg-deep ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {!errored && src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={eager}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${zoom}`}
        />
      )}
      {(errored || !loaded) && (
        <div className={`bg-placeholder absolute inset-0 border border-k-line-soft ${zoom}`}>
          {label && (
            <span className="absolute bottom-3 left-3.5 font-condensed text-[11px] uppercase tracking-[0.14em] text-k-ink-3">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
