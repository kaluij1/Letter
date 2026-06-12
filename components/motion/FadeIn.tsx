"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** When true, animates only once when scrolled into view */
  once?: boolean;
}

/** Reusable scroll-triggered fade entrance used across story sections. */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
