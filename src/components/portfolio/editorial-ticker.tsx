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
  // Duplicate items for seamless loop
  const items = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--surface-border)] py-3.5 select-none bg-[var(--surface)]/50"
      aria-hidden
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 font-code text-xs uppercase tracking-widest text-muted-foreground/70"
          >
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--color-accent-copper)]/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}