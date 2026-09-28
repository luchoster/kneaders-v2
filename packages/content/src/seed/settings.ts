import type { SiteSettings } from "../types";
import { keyed } from "./helpers";

export const siteSettings: SiteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Kneaders Bakery & Café",
  description:
    "Hearth-baked breads, sandwiches, soups, and pastries — baked at dawn since 1997.",
  announcements: [
    "Hot bread out of the oven at 6 AM",
    "Soup of the day · Tomato Basil",
    "Catering · 24-hour notice",
    "New: spring pastry menu",
  ],
  navLinks: keyed("nav", [
    { key: "menu", label: "Menu", href: "/menu" },
    { key: "catering", label: "Catering", href: "/catering" },
    { key: "journal", label: "Journal", href: "/journal" },
    { key: "story", label: "Our Story", href: "/our-story" },
    { key: "contact", label: "Contact", href: "/contact" },
  ]),
  rewardsLink: { _type: "cta", label: "Rewards", href: "#rewards" },
  orderCta: { _type: "cta", label: "Order Now", href: "/menu" },
  footer: {
    tagline: ["From our", "hearth to", "your table."],
    newsletterHeading: "Stay in the warm",
    newsletterBody:
      "Seasonal drops, bread releases, and the rare bench-grade newsletter — once a fortnight, no more.",
    newsletterPlaceholder: "you@goodmorning.com",
    columns: keyed("footcol", [
      {
        heading: "Order",
        links: keyed("footcol-order", [
          { label: "Menu", href: "/menu" },
          { label: "Catering", href: "/catering" },
          { label: "Order Online", href: "/menu" },
          { label: "Soup Schedule", href: "/menu#soups" },
        ]),
      },
      {
        heading: "Company",
        links: keyed("footcol-company", [
          { label: "Our Story", href: "/our-story" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/contact" },
          { label: "Community Giving", href: "/giving" },
          { label: "Sustainability", href: "#" },
        ]),
      },
      {
        heading: "Help",
        links: keyed("footcol-help", [
          { label: "Contact", href: "/contact" },
          { label: "Nutrition", href: "#" },
          { label: "FAQ", href: "#" },
          { label: "Accessibility", href: "#" },
        ]),
      },
    ]),
    copyright: "© 2026 Kneaders Bakery & Café · Made by hand · Baked at dawn",
    legalLinks: keyed("legal", [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
    ]),
  },
};
