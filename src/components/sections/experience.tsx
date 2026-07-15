"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, Building2 } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Experiência"
          title="Onde tenho construído."
          description="Uma ponte entre o mundo corporativo regulado e o ecossistema web moderno."
        />

        <div className="mt-14">
          {/* Summary strip integrated into header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-wrap items-center gap-4 font-code text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[var(--color-accent-copper)]" />
              <span>{experiences.length} experiências</span>
            </span>
            <span className="text-[var(--color-accent-copper)]">·</span>
            <span>2+ anos no mercado</span>
            <span className="text-[var(--color-accent-copper)]">·</span>
            <span>Foco: SAP/TMS + Web moderno</span>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line — 1px solid, not gradient */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-[var(--surface-border)] sm:left-6" />

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Timeline node — current gets pulse animation, past gets subtle dot */}
                  <div
                    className={cn(
                      "absolute left-0 top-1 flex items-center justify-center rounded-full border-2 border-[var(--color-accent-copper)] bg-background sm:left-2 h-8 w-8 sm:h-9 sm:w-9",
                      exp.current && "sm:h-[38px] sm:w-[38px]"
                    )}
                  >
                    {exp.current ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-copper)] animate-[pulse_2s_ease-in-out_infinite]" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-copper)]/40" />
                    )}
                  </div>

                  {/* Card — current job gets left accent bar */}
                  <div className={cn(
                    "card-surface rounded-xl p-5 sm:p-6",
                    exp.current && "border-l-[3px] border-l-[var(--color-accent-copper)]"
                  )}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            {exp.company}
                          </h3>
                          {exp.current && (
                            <span className="rounded-md bg-[var(--color-accent-sage)]/10 px-2 py-0.5 font-code text-[10px] font-medium uppercase text-[var(--color-accent-sage)]">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-[var(--color-accent-copper)]">
                          {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 font-code text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {exp.location} · {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {exp.summary}
                    </p>

                    {/* Achievements */}
                    <div className="mt-4">
                      <p className="mono-label mb-2">Conquistas</p>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((a) => (
                          <li
                            key={a}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-sage)]" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[var(--surface-border)] px-2 py-0.5 font-code text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}