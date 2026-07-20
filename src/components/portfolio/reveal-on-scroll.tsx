"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function RevealOnScroll({
  children,
  className = "",
  stagger = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  if (!stagger) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      <motion.div variants={item}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Shimmer/glow line that animates across a section */
export function AnimatedLine({
  className = "",
  color = "var(--color-accent-copper)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px w-full origin-left ${className}`}
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      aria-hidden
    />
  );
}

/** Number counter that animates when in view */
export function AnimatedNumber({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}