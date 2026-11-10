"use client";

import Image from "next/image";
import { Link } from "react-aria-components";

/** Official Kneaders logo (250×104 source). */
export function Wordmark({ href = "/", height = 38 }: { href?: string; height?: number }) {
  const img = (
    <Image
      src="/kneaders-logo.png"
      // Inside the home link, the link's aria-label names it, so the image is decorative.
      alt={href ? "" : "Kneaders Bakery & Café"}
      width={250}
      height={104}
      loading="eager"
      className="block w-auto"
      style={{ height }}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Kneaders Bakery & Café — home">
      {img}
    </Link>
  );
}
