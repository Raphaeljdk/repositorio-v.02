"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Layers,
  Award,
  Calendar,
  BookOpen,
  GitBranch,
  MapPin,
  GraduationCap,
  Crosshair,
  CircleCheck,
  Sparkles,
} from "lucide-react";
import { personal, stats } from "@/lib/data";
import { useCountUp, useInView } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import { GitHubHeatmap } from "./github-heatmap";
import { CurrentlyWidget } from "./currently-widget";
import { KanjiNumber } from "@/components/portfolio/signature";
import { KanjiBackdrop } from "@/components/portfolio/signature";
import BorderGlow from "@/components/portfolio/border-glow";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  layers: Layers,
  award: Award,
  calendar: Calendar,
  book: BookOpen,
  gitBranch: GitBranch,
  sparkles: Sparkles,
};

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative scroll-mt-24 pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Section kanji backdrop — 学 (Learning) */}
      <KanjiBackdrop kanji="学" side="left" top={15} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Sobre"
          title="Engenharia com intenção."
          kanji={1}
          description="Ponte entre o rigor corporativo regulado e a velocidade do ecossistema web — entregando produtos que entregam desempenho, escalam e resolvem problemas reais do negócio."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: story + info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Bio card */}
            <BorderGlow
              edgeSensitivity={25}
              glowColor="10 80 60"
              backgroundColor="var(--card-bg)"
              borderRadius={14}
              glowRadius={20}
              glowIntensity={0.7}
              coneSpread={30}
              colors={["#D93838", "#F2C14E", "#2B5B84"]}
            >
            <div className="border-t-2 border-t-[var(--color-accent-copper)] p-6 sm:p-8">
              <p className="relative text-base leading-relaxed text-foreground/90 sm:text-lg">
                {personal.bioLong}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {["Arquiteturas escaláveis", "IA Generativa & Produtividade", "Modelagem de Sistemas", "Observabilidade", "React · Next.js · TypeScript"].map(
                  (t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 font-code text-xs text-muted-foreground"
                    >
                      <span className="text-[var(--color-accent-copper)]">—</span>
                      {t}
                    </span>
                  )
                )}
              </motion.div>
            </div>
            </BorderGlow>

            {/* Tech stack quick-view — horizontal icon strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-surface rounded-xl p-5"
            >
              <p className="mono-label mb-3">Stack Tecnológica Principal</p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                  { name: "SAP B1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sap/sap-original.svg" },
                  { name: "ChatGPT", icon: "/chatgpt-logo.png" },
                  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group/item flex items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 transition-all duration-300 hover:border-[var(--color-accent-copper)]/50 hover:shadow-[0_4px_12px_rgba(217,56,56,0.1)] hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="h-4 w-4 grayscale opacity-60 transition-all duration-200 group-hover/item:grayscale-0 group-hover/item:opacity-100"
                      loading="lazy"
                    />
                    <span className="text-xs font-medium text-muted-foreground transition-colors group-hover/item:text-foreground">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Info cards — with Lucide icons, no emojis */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "Localização", value: personal.location, icon: <MapPin className="h-4 w-4" /> },
                { label: "Universidade", value: personal.university, icon: <GraduationCap className="h-4 w-4" /> },
                { label: "Foco atual", value: "React · Next.js · IA Generativa", icon: <Crosshair className="h-4 w-4" /> },
                { label: "Status", value: personal.availability, icon: <CircleCheck className="h-4 w-4" /> },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <InfoCard label={card.label} value={card.value} icon={card.icon} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: GitHub heatmap + compact stats + currently */}
          <div className="space-y-4">
            <GitHubHeatmap />

            {/* Currently widget */}
            <CurrentlyWidget />

            {/* Compact stats row — 3 cards */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-3"
            >
              {stats.slice(0, 3).map((s, i) => (
                <StatCard
                  key={s.label}
                  stat={s}
                  start={inView}
                  delay={i * 0.08}
                />
              ))}
            </motion.div>
          </div>
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
  const display =
    stat.value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}${stat.suffix ?? ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="card-surface border-l-2 border-l-[var(--color-accent-copper)] rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent-copper)]/10 text-[var(--color-accent-copper)]">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-2 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {display}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
    </motion.div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <BorderGlow
      edgeSensitivity={20}
      glowColor="10 80 60"
      backgroundColor="var(--card-bg)"
      borderRadius={12}
      glowRadius={14}
      glowIntensity={0.5}
      coneSpread={30}
      colors={["#D93838", "#F2C14E", "#2B5B84"]}
    >
      <div className="p-4 [transition:transform_0.3s_ease,border-color_0.3s_ease,box-shadow_0.3s_ease] hover:[transform:scale(1.02)_translateY(-2px)] hover:border-[var(--color-accent-copper)]">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--color-accent-copper)]">
            {icon}
          </span>
          <span className="mono-label">{label}</span>
        </div>
        <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
      </div>
    </BorderGlow>
  );
}

/** Reusable section heading — no eyebrow numbering, just a monospace label.
 *  Now with an optional calligraphic kanji ordinal (一二三...) that
 *  replaces the generic "01/02/03" eyebrow — a signature touch. */
export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  kanji,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  kanji?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        {kanji && <KanjiNumber n={kanji} />}
        <span className="mono-label">{label}</span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <>
          <div className="mt-3 h-px w-12 bg-[var(--color-accent-copper)]" />
          <p className="mt-3 text-sm text-muted-foreground sm:text-base leading-relaxed">{description}</p>
        </>
      )}
    </motion.div>
  );
}