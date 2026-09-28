import Image from "next/image";
import Link from "next/link";

/** Official Kneaders logo (250×104 source). */
export function Wordmark({ href = "/", height = 33, inverted = false }: { href?: string; height?: number; inverted?: boolean }) {
  const img = (
    <Image
      src="/kneaders-logo.png"
      alt="Kneaders Bakery & Café"
      width={250}
      height={104}
      priority
      className={`block w-auto ${inverted ? "invert brightness-[1.05]" : ""}`}
      style={{ height }}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="group inline-flex items-center gap-3" aria-label="Kneaders Bakery & Café — home">
      {img}
    </Link>
  );
}
