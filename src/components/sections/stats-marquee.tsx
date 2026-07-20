"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-count-up";
import { useCountUp } from "@/hooks/use-count-up";

const MARQUEE_STATS = [
  { value: 10, suffix: "+", label: "Projetos", color: "#DC2626" },
  { value: 30, suffix: "+", label: "Tecnologias", color: "#10B981" },
  { value: 4, suffix: "", label: "IAs Utilizadas", color: "#F97316" },
  { value: 9, suffix: "", label: "Certificações", color: "#7C8CF8" },
  { value: 4500, suffix: "+", label: "Horas Estudo", color: "#B91C1C" },
  { value: 15, suffix: "", label: "Repositórios", color: "#9A3412" },
];

/* ------------------------------------------------------------------ */
/*  Duplicate for infinite scroll                                      */
/* ------------------------------------------------------------------ */
const ALL_STATS = [...MARQUEE_STATS, ...MARQUEE_STATS];

export function StatsMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--surface-border)] bg-[var(--surface)] py-5">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--surface)] to-transparent" />

      <motion.div
        className="flex w-max items-center gap-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {ALL_STATS.map((stat, i) => (
          <MarqueeItem key={i} stat={stat} />
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeItem({ stat }: { stat: (typeof MARQUEE_STATS)[number] }) {
  return (
    <div className="flex shrink-0 items-center gap-4 px-8">
      <span
        className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl"
        style={{ color: stat.color }}
      >
        {stat.value}{stat.suffix}
      </span>
      <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Counter Strip — full-width section with big counters       */
/* ------------------------------------------------------------------ */
const COUNTER_DATA = [
  { value: 10, suffix: "+", label: "Projetos entregues", description: "SaaS, ERP, dashboards, APIs, apps web" },
  { value: 30, suffix: "+", label: "Tecnologias dominadas", description: "Frontend, backend, cloud, IA, corporativo" },
  { value: 4, suffix: "", label: "IAs Generativas", description: "ChatGPT, DeepSeek, GLM, Gemini" },
  { value: 4500, suffix: "+", label: "Horas de estudo", description: "Cursos, certificações, projetos práticos" },
];

export function StatsCounter() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative scroll-mt-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent-copper)]/[0.02] to-transparent" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mono-label text-center"
        >
          Números que importam
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Resultado em cada projeto.
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {COUNTER_DATA.map((item, i) => (
            <CounterCard key={item.label} item={item} start={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({
  item,
  start,
  delay,
}: {
  item: (typeof COUNTER_DATA)[number];
  start: boolean;
  delay: number;
}) {
  const value = useCountUp(item.value, 2000, start);
  const display = item.value >= 1000
    ? `${(value / 1000).toFixed(1)}k`
    : `${value}${item.suffix}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative text-center"
    >
      {/* Copper top accent */}
      <div className="mx-auto h-1 w-8 rounded-full bg-[var(--color-accent-copper)] transition-all duration-300 group-hover:w-14" />

      <p className="mt-5 font-display text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">
        {display}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground/80">{item.label}</p>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[180px] mx-auto">
        {item.description}
      </p>
    </motion.div>
  );
}