"use client";

import type { ReactNode } from "react";
import { Link } from "react-aria-components";

/**
 * React Aria link: client-side routing for internal paths (via `Providers`),
 * a plain anchor for external / mailto / tel. Renders a real `<a href>`.
 */
export function SmartLink({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children?: ReactNode;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}) {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
