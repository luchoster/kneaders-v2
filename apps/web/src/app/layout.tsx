import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Kneaders Bakery & Café", template: "%s — Kneaders Bakery & Café" },
  description: "Hearth-baked breads, sandwiches, soups, and pastries — baked at dawn since 1997.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
