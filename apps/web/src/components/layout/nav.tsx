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
        scrolled
          ? "border-k-line-soft bg-[color-mix(in_oklab,var(--color-k-bg)_88%,transparent)] backdrop-blur-[10px] backdrop-saturate-[1.4]"
          : "border-transparent bg-k-bg"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l._key}
              href={l.href}
              aria-current={active === l.key ? "page" : undefined}
              className={`relative font-display text-sm font-medium tracking-[0.01em] ${
                active === l.key ? "text-k-brown" : "text-k-black"
              }`}
            >
              <span className="link-anim">{l.label}</span>
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {rewardsLink && (
            <Link href={rewardsLink.href} className="font-display text-sm tracking-[-0.01em] text-k-black">
              <span className="link-anim">{rewardsLink.label}</span>
            </Link>
          )}
          <Button href={orderCta.href} variant="primary" arrow>
            {orderCta.label}
          </Button>
        </div>
        <AriaButton
          ref={toggleRef}
          className="inline-flex cursor-pointer items-center rounded-full border border-k-black px-3.5 py-2 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-k-black transition-colors duration-200 hover:bg-k-black hover:text-k-bg md:hidden"
          onPress={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </AriaButton>
      </Container>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-k-line-soft md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {navLinks.map((l) => (
              <Link
                key={l._key}
                href={l.href}
                onPress={() => setOpen(false)}
                aria-current={active === l.key ? "page" : undefined}
                className="font-display text-lg tracking-[-0.01em]"
              >
                {l.label}
              </Link>
            ))}
            <Button href={orderCta.href} variant="primary" className="mt-2 self-start">
              {orderCta.label} →
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
