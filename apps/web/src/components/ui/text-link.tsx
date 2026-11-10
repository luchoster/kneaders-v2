import type { ReactNode } from "react";
import { SmartLink } from "./smart-link";

/**
 * Underlined text link with an arrow that nudges on hover.
 *
 * `stretched` makes the link cover its nearest `relative` ancestor, so a whole
 * card is clickable while the link keeps a short accessible name. Give that
 * ancestor `group/card` and the hover states follow the card.
 */
export function TextLink({
  href,
  children,
  arrow = true,
  stretched = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  arrow?: boolean;
  stretched?: boolean;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={`text-link group/link hover:text-k-accent group-hover/card:text-k-accent ${
        stretched ? "after:absolute after:inset-0 after:content-['']" : ""
      } ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-[250ms] group-hover/link:translate-x-[3px] group-hover/card:translate-x-[3px]"
        >
          →
        </span>
      )}
    </SmartLink>
  );
}
