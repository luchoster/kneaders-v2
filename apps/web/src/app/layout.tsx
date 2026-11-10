import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Kneaders Bakery & Café", template: "%s — Kneaders Bakery & Café" },
  description: "Hearth-baked breads, sandwiches, soups, and pastries — baked at dawn since 1997.",
};

/** Scroll reveals start hidden and are shown by script, so without JavaScript they must be visible. */
const noScriptStyles = ".reveal{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        </noscript>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
