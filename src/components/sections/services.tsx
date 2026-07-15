"use client";

import { motion } from "framer-motion";
import { Code2, Building2, Sparkles, Cloud, Check } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "./about";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  building: Building2,
  sparkles: Sparkles,
  cloud: Cloud,
};

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 / Serviços"
          title="Como posso ajudar."
          description="Atuação full stack que conecta estratégia corporativa, engenharia moderna e design premium."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Code2;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-violet-400/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow-emerald">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
