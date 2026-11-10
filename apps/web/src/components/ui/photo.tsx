"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@kneaders/content";
import { mediaFocus, mediaSrc } from "@/lib/media";

/** The fixed aspect ratios from the v3 brief. */
const ratios = {
  "5/4": "aspect-[5/4]", // page heroes
  "21/9": "aspect-[21/9]", // wide story bands
  "4/5": "aspect-[4/5]", // menu items, packages, portraits
  "4/3": "aspect-[4/3]", // journal
  "3/2": "aspect-[3/2]", // two-up panels, menu details sheet
  "1/1": "aspect-square", // category tiles
} as const;

export type PhotoRatio = keyof typeof ratios;

/**
 * The photograph: a plain rectangle with a 4px radius on a soft tan well.
 * The image fades in when loaded, is cropped around the Sanity hotspot, and
 * eases into a slight zoom while a `group/card` ancestor is hovered.
 */
export function Photo({
  media,
  alt,
  ratio = "4/3",
  eager = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  media?: Media | null;
  /** Defaults to the alt text stored with the image; pass "" when the photo is decorative. */
  alt?: string;
  ratio?: PhotoRatio;
  /** Above-the-fold photo: loaded right away, at high priority, and shown without the fade. */
  eager?: boolean;
  sizes?: string;
  /** e.g. a different aspect ratio on small screens. */
  className?: string;
}) {
  const src = mediaSrc(media, 1800);
  const [loaded, setLoaded] = useState(eager);
  const [errored, setErrored] = useState(!src);
  const label = alt ?? media?.alt ?? "";
  return (
    <div className={`relative isolate w-full overflow-hidden rounded-[4px] bg-k-photo ${ratios[ratio]} ${className}`}>
      {errored || !src ? (
        // No image (or it failed): a quiet tan well that names what belongs here.
        <div className="absolute inset-0 flex items-end bg-linear-160 from-[#f1e8d8] to-[#e6d9c2] px-[18px] py-4">
          {label && (
            <span className="font-condensed text-xs uppercase tracking-[0.16em] text-k-ink-2">{label}</span>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ objectPosition: mediaFocus(media) }}
          // Tailwind's scale utilities set the CSS `scale` property (not `transform`), so that is the
          // property to transition. `will-change` keeps the photo on its own layer, so the slow zoom
          // glides instead of re-rendering when it starts and settles.
          className={`object-cover transition-[scale,opacity] duration-[1400ms,600ms] ease-[var(--ease-soft),ease] will-change-[scale] group-hover/card:scale-[1.04] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
