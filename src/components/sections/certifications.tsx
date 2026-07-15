"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, GraduationCap, TrendingUp, CircleDot, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "completed", label: "Concluídas" },
  { id: "in-progress", label: "Em progresso" },
  { id: "planned", label: "Planejadas" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

export function Certifications() {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return certifications;
    return certifications.filter((c) => c.status === filter);
  }, [filter]);

  const totals = useMemo(() => {
    const completed = certifications.filter((c) => c.status === "completed").length;
    const totalHours = certifications
      .filter((c) => c.status === "completed")
      .reduce((acc, c) => acc + parseInt(c.hours), 0);
    return { completed, totalHours, total: certifications.length };
  }, []);

  return (
    <section id="certifications" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="06 / Certificações"
          title="Aprendizado contínuo."
          description="Formações que sustentam a stack — do freeCodeCamp ao SENAI, do SAP Learning Hub à AWS."
        />

        {/* Summary stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SummaryCard
            icon={<Award className="h-5 w-5" />}
            value={totals.completed.toString()}
            label="Concluídas"
            accent="from-emerald-500 to-teal-500"
          />
          <SummaryCard
            icon={<Clock className="h-5 w-5" />}
            value={`${totals.totalHours}h`}
            label="Horas investidas"
            accent="from-amber-500 to-orange-500"
          />
          <SummaryCard
            icon={<TrendingUp className="h-5 w-5" />}
            value="65%"
            label="SAP ABAP em curso"
            accent="from-violet-500 to-fuchsia-500"
          />
          <SummaryCard
            icon={<GraduationCap className="h-5 w-5" />}
            value="2028"
            label="Eng. Software"
            accent="from-cyan-500 to-sky-500"
          />
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                filter === f.id
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground border border-border/60 bg-background/40 backdrop-blur-md"
              )}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="cert-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
                className="group relative overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      c.status === "completed"
                        ? "bg-emerald-400/12 text-emerald-300"
                        : c.status === "in-progress"
                          ? "bg-amber-400/12 text-amber-300"
                          : "bg-violet-400/12 text-violet-300"
                    )}
                  >
                    <Award className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      c.status === "completed"
                        ? "bg-emerald-400/12 text-emerald-300"
                        : c.status === "in-progress"
                          ? "bg-amber-400/12 text-amber-300"
                          : "bg-violet-400/12 text-violet-300"
                    )}
                  >
                    <CircleDot className="h-2.5 w-2.5" />
                    {c.status === "completed"
                      ? "Concluída"
                      : c.status === "in-progress"
                        ? "Em curso"
                        : "Planejada"}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-base font-bold leading-snug text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.institution}</p>

                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {c.hours}
                  </span>
                  <span>·</span>
                  <span>{c.year}</span>
                  <span>·</span>
                  <span className="rounded-md bg-muted/50 px-1.5 py-0.5 font-code text-[10px]">
                    {c.category}
                  </span>
                </div>

                {/* Progress for in-progress */}
                {c.status === "in-progress" && typeof c.progress === "number" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Progresso</span>
                      <span className="font-code text-amber-400">{c.progress}%</span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                      />
                    </div>
                  </div>
                )}

                {c.credentialId && (
                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
                    <span className="font-code text-[10px] text-muted-foreground">
                      ID: {c.credentialId}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline"
                    >
                      Verificar <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl glass p-4"
    >
      <div className={cn("absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-20 blur-xl", accent)} />
      <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", accent)}>
        {icon}
      </span>
      <p className="mt-3 font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
}
