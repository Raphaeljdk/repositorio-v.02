"use client";

import { motion } from "framer-motion";
import { Coffee, BookOpen, Music, Code2, Globe, Headphones } from "lucide-react";

interface CurrentlyItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const CURRENTLY: CurrentlyItem[] = [
  {
    icon: <Code2 className="h-3.5 w-3.5" />,
    label: "Construindo",
    value: "API Gateway Service",
    color: "var(--color-accent-copper)",
  },
  {
    icon: <BookOpen className="h-3.5 w-3.5" />,
    label: "Estudando",
    value: "Arquitetura de Microsserviços",
    color: "var(--color-accent-sage)",
  },
  {
    icon: <Headphones className="h-3.5 w-3.5" />,
    label: "Ouvindo",
    value: "Lo-fi & Jazz",
    color: "var(--color-accent-gold)",
  },
  {
    icon: <Globe className="h-3.5 w-3.5" />,
    label: "Foco",
    value: "Cloud Nativo & Next.js",
    color: "#B91C1C",
  },
  {
    icon: <Coffee className="h-3.5 w-3.5" />,
    label: "Energizado por",
    value: "Café + Curiosidade",
    color: "var(--color-accent-copper)",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CurrentlyWidget() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="card-surface rounded-xl p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[var(--color-accent-sage)] opacity-40 animate-[ping_1.5s_ease-in-out_infinite]" />
          <span className="relative block h-2 w-2 rounded-full bg-[var(--color-accent-sage)]" />
        </span>
        <span className="mono-label">Atualmente</span>
        <span className="ml-auto font-code text-[10px] text-muted-foreground/50">
          /now
        </span>
      </div>

      <div className="space-y-3">
        {CURRENTLY.map((c) => (
          <motion.div
            key={c.label}
            variants={item}
            className="flex items-center gap-3"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: `color-mix(in srgb, ${c.color} 12%, transparent)` }}
            >
              <span style={{ color: c.color }}>{c.icon}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                {c.label}
              </p>
              <p className="text-sm font-medium text-foreground/90 truncate">
                {c.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}