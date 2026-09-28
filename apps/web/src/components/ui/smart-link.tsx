import Link from "next/link";
import type { ComponentProps } from "react";

/** next/link for internal paths, plain <a> for external / mailto / tel. */
export function SmartLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
