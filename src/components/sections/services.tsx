"use client";

import { motion } from "framer-motion";
import { Code2, Building2, Palette, Cloud, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  building: Building2,
  sparkles: Palette,
  cloud: Cloud,
};

const SERVICE_ACCENTS = [
  "var(--color-accent-copper)",
  "var(--color-accent-sage)",
  "var(--color-accent-gold)",
  "#7C8CF8",
] as const;

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Subtle diagonal line pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          var(--color-accent-copper) 0px,
          var(--color-accent-copper) 1px,
          transparent 1px,
          transparent 20px
        )`,
      }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Serviços"
          title="Como posso ajudar."
          description="Atuação full stack que conecta estratégia corporativa, engenharia moderna e design premium."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Code2;
            const accent = SERVICE_ACCENTS[i % SERVICE_ACCENTS.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-surface group relative rounded-xl p-6"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                  style={{ background: accent }}
                />

                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </span>

                <h3 className="mt-5 font-display text-base font-bold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {s.items.map((item, j) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-foreground/70"
                    >
                      <span
                        className="h-1 w-1 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" style={{ color: accent }}>
                  Saiba mais <ArrowUpRight className="h-3 w-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}