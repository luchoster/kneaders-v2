"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

/** Hover lift (`whileHover={{ y }}`), spring physics. */
export function Lift({
  y = -6,
  href,
  children,
  ...rest
}: {
  y?: number;
  href?: string;
  children: ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const hover = { y };
  if (href) {
    return (
      <MotionLink href={href} whileHover={hover} {...(rest as object)}>
        {children}
      </MotionLink>
    );
  }
  return (
    <motion.div whileHover={hover} {...rest}>
      {children}
    </motion.div>
  );
}
