"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RouterProvider } from "react-aria-components";

const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Client-side navigation for React Aria links, and `prefers-reduced-motion`
 * for every `motion` animation (transforms are dropped, opacity is kept).
 * Animations use the lightweight `m` component; `LazyMotion` pulls in the
 * animation runtime (`domAnimation`) in a separate chunk after hydration.
 */
export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <LazyMotion features={loadMotionFeatures}>
      <MotionConfig reducedMotion="user">
        <RouterProvider navigate={(href) => router.push(href)}>{children}</RouterProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
