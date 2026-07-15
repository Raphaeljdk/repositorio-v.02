"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Layers,
  Award,
  Calendar,
  BookOpen,
  GitBranch,
  Quote,
  Sparkles,
} from "lucide-react";
import { personal, stats } from "@/lib/data";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  layers: Layers,
  award: Award,
  calendar: Calendar,
  book: BookOpen,
  gitBranch: GitBranch,
};

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="01 / Sobre"
          title="Engenharia com intenção."
          description="Mento entre o rigor corporativo e a velocidade do ecossistema web — entregando produtos que performam, escalam e encantam."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: story + services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8">
              <Quote className="absolute -right-4 -top-4 h-24 w-24 text-emerald-400/10" />
              <p className="relative text-lg leading-relaxed text-foreground/90">
                {personal.bioLong}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Arquiteturas escaláveis", "DX impecável", "Design system", "Observabilidade"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Personal card */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Localização" value={personal.location} accent="emerald" icon="pin" />
              <InfoCard label="Universidade" value={personal.university} accent="violet" icon="cap" />
              <InfoCard label="Foco atual" value="React · Next.js · Cloud" accent="amber" icon="spark" />
              <InfoCard label="Status" value={personal.availability} accent="teal" icon="dot" />
            </div>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-2"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} start={inView} delay={i * 0.08} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  start,
  delay,
}: {
  stat: (typeof stats)[number];
  start: boolean;
  delay: number;
}) {
  const Icon = ICONS[stat.icon] ?? Rocket;
  const value = useCountUp(stat.value, 1600, start);
  const display = stat.value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}${stat.suffix ?? ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl glass p-4 sm:p-5"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/0 to-violet-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-emerald-400/10 group-hover:to-violet-400/10" />
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/12 text-emerald-300">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
          {String(stat.value).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {display}
      </p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
    </motion.div>
  );
}

function InfoCard({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: string;
  accent: "emerald" | "violet" | "amber" | "teal";
  icon: "pin" | "cap" | "spark" | "dot";
}) {
  const accentMap = {
    emerald: "text-emerald-300 bg-emerald-400/12",
    violet: "text-violet-300 bg-violet-400/12",
    amber: "text-amber-300 bg-amber-400/12",
    teal: "text-teal-300 bg-teal-400/12",
  } as const;
  const iconMap = {
    pin: "📍",
    cap: "🎓",
    spark: "✨",
    dot: "🟢",
  } as const;
  return (
    <div className="rounded-2xl glass p-4">
      <div className="flex items-center gap-2">
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg text-xs", accentMap[accent])}>
          {iconMap[icon]}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <span className="font-code text-xs uppercase tracking-[0.3em] text-emerald-400">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
