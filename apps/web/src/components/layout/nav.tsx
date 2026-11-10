"use client";

import { useEffect, useRef, useState } from "react";
import { Button as AriaButton, Link } from "react-aria-components";
import type { SiteSettings } from "@kneaders/content";
import { Button } from "../ui/button";
import { Container } from "../ui/container";
import { Wordmark } from "./wordmark";

export function Nav({ settings, active }: { settings: SiteSettings; active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu and hands focus back to its toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const { navLinks, orderCta, rewardsLink } = settings;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-k-line bg-k-bg/94 backdrop-blur-[10px]" : "border-transparent bg-k-bg"
      }`}
    >
      <Container className="flex h-(--k-header-h) items-center justify-between gap-6">
        <Wordmark />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l._key} href={l.href} aria-current={active === l.key ? "page" : undefined} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          {rewardsLink && (
            <Link href={rewardsLink.href} className="nav-link">
              {rewardsLink.label}
            </Link>
          )}
          <Button href={orderCta.href} size="sm">
            {orderCta.label}
          </Button>
        </div>
        <AriaButton
          ref={toggleRef}
          className="inline-flex cursor-pointer items-center rounded-full border border-k-line-strong px-4 py-[9px] font-body text-sm font-medium text-k-ink transition-colors duration-[250ms] hover:border-k-ink md:hidden"
          onPress={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </AriaButton>
      </Container>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-k-line bg-k-bg md:hidden">
          <Container className="flex flex-col gap-4 pt-5 pb-6">
            {navLinks.map((l) => (
              <Link
                key={l._key}
                href={l.href}
                onPress={() => setOpen(false)}
                aria-current={active === l.key ? "page" : undefined}
                className="type-h4"
              >
                {l.label}
              </Link>
            ))}
            {rewardsLink && (
              <Link href={rewardsLink.href} onPress={() => setOpen(false)} className="type-h4">
                {rewardsLink.label}
              </Link>
            )}
            <Button href={orderCta.href} className="mt-2 self-start">
              {orderCta.label}
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
