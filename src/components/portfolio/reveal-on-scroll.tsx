"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.64, ease } },
};

export function RevealOnScroll({ children, className = "", stagger = true }: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      variants={stagger ? { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } } : item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: "some" }}
      className={className}
    >
      {stagger ? Children.map(children, child => (
        <motion.div variants={item}>{child}</motion.div>
      )) : children}
    </motion.div>
  );
}

export function AnimatedLine({ className = "", color = "var(--color-accent-copper)" }: {
  className?: string;
  color?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className={`h-px w-full origin-left ${className}`}
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      aria-hidden
    />
  );
}

export function AnimatedNumber({ value, className = "" }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease }}
      className={className}
    >{value}</motion.span>
  );
}
