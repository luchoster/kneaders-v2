"use client";

import { MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RouterProvider } from "react-aria-components";

/**
 * Client-side navigation for React Aria links, and `prefers-reduced-motion`
 * for every `motion` animation (transforms are dropped, opacity is kept).
 */
export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider navigate={(href) => router.push(href)}>{children}</RouterProvider>
    </MotionConfig>
  );
}
