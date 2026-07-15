"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, Code2, Database, Cloud, Table2, Server, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
          label="Certificações"
          title="Aprendizado contínuo."
          description="Formações que sustentam a stack — do freeCodeCamp ao SENAI, do SAP Learning Hub à AWS."
        />

        {/* Summary strip — simple, no gradient icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <SummaryItem
            label="Concluídas"
            value={`${totals.completed}`}
            index={0}
          />
          <SummaryItem
            label="Horas investidas"
            value={`${totals.totalHours}h`}
            index={1}
          />
          <SummaryItem
            label="SAP ABAP em curso"
            value="65%"
            index={2}
          />
          <SummaryItem
            label="Eng. Software"
            value="2028"
            index={3}
          />
        </motion.div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "bg-[var(--color-accent-copper)] text-white shadow-[0_0_12px_rgba(212,119,92,0.3)]"
                  : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
                className="card-surface rounded-xl p-5"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      c.status === "completed"
                        ? "bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]"
                        : c.status === "in-progress"
                          ? "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {(() => { const I = getCertIconClass(c.category, c.name); return <I className="h-4 w-4" />; })()}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-code text-[10px] font-medium",
                      c.status === "completed"
                        ? "bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]"
                        : c.status === "in-progress"
                          ? "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {c.status === "completed"
                      ? "Concluída"
                      : c.status === "in-progress"
                        ? "Em curso"
                        : "Planejada"}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-sm font-bold leading-snug text-foreground">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.institution}</p>

                <div className="mt-3 flex items-center gap-3 font-code text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {c.hours}
                  </span>
                  <span>·</span>
                  <span>{c.year}</span>
                  <span>·</span>
                  <span className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px]">
                    {c.category}
                  </span>
                </div>

                {/* Progress bar — only for in-progress, gold color */}
                {c.status === "in-progress" && typeof c.progress === "number" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between font-code text-[10px] text-muted-foreground">
                      <span>Progresso</span>
                      <span className="text-[var(--color-accent-gold)]">{c.progress}%</span>
                    </div>
                    <div className="mt-1 h-px w-full overflow-hidden rounded-full bg-muted/60">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-[var(--color-accent-gold)]"
                      />
                    </div>
                  </div>
                )}

                {c.credentialId && (
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--surface-border)] pt-3">
                    <span className="font-code text-[10px] text-muted-foreground">
                      ID: {c.credentialId}
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 font-code text-[10px] text-[var(--color-accent-copper)] hover:underline"
                    >
                      Verificar <ExternalLink className="h-2.5 w-2.5" />
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

const CERT_ICON_MAP: Array<{ test: RegExp; Icon: LucideIcon }> = [
  { test: /JavaScript|Web|Git/i, Icon: Code2 },
  { test: /Java|Banco/i, Icon: Database },
  { test: /Cloud|Nuvem/i, Icon: Cloud },
  { test: /Excel/i, Icon: Table2 },
  { test: /SAP|ABAP/i, Icon: Server },
];

function getCertIconClass(category: string, name: string): LucideIcon {
  const combined = `${name} ${category}`;
  for (const { test, Icon } of CERT_ICON_MAP) {
    if (test.test(combined)) return Icon;
  }
  return Award;
}

function SummaryItem({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface rounded-xl p-4"
    >
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 h-px w-8 bg-[var(--color-accent-copper)]" />
    </motion.div>
  );
}