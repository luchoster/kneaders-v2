import type { ReactNode } from "react";
import { getSettings } from "@/lib/sanity/fetch";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { TopBar } from "./top-bar";

export async function SiteShell({ active, children }: { active?: string; children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopBar items={settings.announcements} />
      <Nav settings={settings} active={active} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
