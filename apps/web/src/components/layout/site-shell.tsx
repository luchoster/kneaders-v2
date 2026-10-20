import type { ReactNode } from "react";
import { JsonLd } from "@/components/ui/json-ld";
import { getSettings } from "@/lib/sanity/fetch";
import { siteJsonLd } from "@/lib/structured-data";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { TopBar } from "./top-bar";

export async function SiteShell({ active, children }: { active?: string; children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={siteJsonLd(settings)} />
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
