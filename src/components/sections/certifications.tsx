"use client";

import { useMemo, useState, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, Code2, Database, Cloud, Table2, Server, Copy, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";
import { useCardGlow } from "@/hooks/use-card-glow";
import { useToast } from "@/hooks/use-toast";

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
    <section id="certifications" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      {/* Subtle sage glow */}
      <div className="pointer-events-none absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-[var(--color-accent-sage)]/[0.03] blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Certificações"
          title="Aprendizado contínuo."
          kanji={8}
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
            label="SAP em curso"
            value="3"
            index={2}
          />
          <SummaryItem
            label="Eng. Software"
            value="2029"
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
                "rounded-lg px-4 py-2 text-sm font-medium active:scale-[0.97] transition-all min-h-[44px] inline-flex items-center",
                filter === f.id
                  ? "bg-[var(--color-accent-copper)] text-white shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                  : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50"
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
              <CertCard key={c.name} cert={c} delay={(i % 3) * 0.05} />
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

function CertCard({ cert, delay }: { cert: (typeof certifications)[number]; delay: number }) {
  const { ref, onMouseMove, onMouseLeave } = useCardGlow<HTMLDivElement>();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleVerify = async () => {
    if (!cert.credentialId) return;
    try {
      await navigator.clipboard.writeText(cert.credentialId);
      setCopied(true);
      toast({ title: "ID copiado!", description: `${cert.credentialId}` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, delay }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="card-surface card-glow rounded-xl p-5"
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            cert.status === "completed"
              ? "bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]"
              : cert.status === "in-progress"
                ? "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                : "bg-muted text-muted-foreground"
          )}
        >
          {createElement(getCertIconClass(cert.category, cert.name), { className: "h-4 w-4" })}
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 font-code text-[10px] font-medium",
            cert.status === "completed"
              ? "bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]"
              : cert.status === "in-progress"
                ? "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                : "bg-muted text-muted-foreground"
          )}
        >
          {cert.status === "completed"
            ? "Concluída"
            : cert.status === "in-progress"
              ? "Em curso"
              : "Planejada"}
        </span>
      </div>

      <h3 className="mt-3 font-display text-sm font-bold leading-snug text-foreground">
        {cert.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{cert.institution}</p>

      <div className="mt-3 flex items-center gap-3 font-code text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> {cert.hours}
        </span>
        <span>·</span>
        <span>{cert.year}</span>
        <span>·</span>
        <span className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px]">
          {cert.category}
        </span>
      </div>

      {/* Progress bar — only for in-progress, gold color */}
      {cert.status === "in-progress" && typeof cert.progress === "number" && (
        <div className="mt-3">
          <div className="flex items-center justify-between font-code text-[10px] text-muted-foreground">
            <span>Progresso</span>
            <span className="text-[var(--color-accent-gold)]">{cert.progress}%</span>
          </div>
          <div className="mt-1 h-px w-full overflow-hidden rounded-full bg-muted/60">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${cert.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-[var(--color-accent-gold)]"
            />
          </div>
        </div>
      )}

      {cert.credentialId && (
        <div className="mt-3 flex items-center justify-between border-t border-[var(--surface-border)] pt-3">
          <span className="font-code text-[10px] text-muted-foreground">
            ID: {cert.credentialId}
          </span>
          <button
            type="button"
            onClick={handleVerify}
            className="inline-flex items-center gap-1 font-code text-[10px] text-[var(--color-accent-copper)] hover:underline cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-2.5 w-2.5" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-2.5 w-2.5" />
                Copiar ID
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
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