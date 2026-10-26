import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

const description = "Hearth-baked breads, sandwiches, soups, and pastries — baked at dawn since 1997.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kneaders Bakery & Café", template: "%s — Kneaders Bakery & Café" },
  description,
  openGraph: {
    type: "website",
    siteName: "Kneaders Bakery & Café",
    locale: "en_US",
    title: "Kneaders Bakery & Café",
    description,
    images: [{ url: "/kneaders-logo.png", alt: "Kneaders Bakery & Café" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kneaders Bakery & Café",
    description,
    images: ["/kneaders-logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
