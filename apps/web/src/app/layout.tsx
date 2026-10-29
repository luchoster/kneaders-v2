import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { PhotoShapeToggle, photoShapeScript } from "@/components/ui/photo-shape-toggle";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Kneaders Bakery & Café", template: "%s — Kneaders Bakery & Café" },
  description: "Hearth-baked breads, sandwiches, soups, and pastries — baked at dawn since 1997.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the <head> script may set data-photo-shape before React hydrates.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: photoShapeScript }} />
      </head>
      <body>
        <Providers>
          {children}
          <PhotoShapeToggle />
        </Providers>
      </body>
    </html>
  );
}
