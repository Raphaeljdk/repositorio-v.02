"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Full Stack Developer",
  "React",
  "Next.js",
  "TypeScript",
  "SAP ABAP",
  "Node.js",
  "Tailwind CSS",
  "Cloud Native",
  "API Design",
  "UI/UX",
  "PostgreSQL",
  "Docker",
  "São Paulo",
  "2026",
];

export function EditorialTicker() {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--surface-border)] py-3 select-none bg-[var(--surface)]/30 backdrop-blur-sm"
      aria-hidden
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="group/tick inline-flex items-center gap-8 font-code text-xs uppercase tracking-[0.15em] text-muted-foreground/60"
          >
            <span className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-[var(--color-accent-copper)]">
              {item}
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--color-accent-copper)]/30 transition-colors duration-300 group-hover/tick:bg-[var(--color-accent-copper)]/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}