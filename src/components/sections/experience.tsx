"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2, Building2 } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "./about";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="04 / Trajetória"
          title="Onde tenho construído."
          description="Uma ponte entre o mundo corporativo regulado e o ecossistema web moderno. Cada experiência deixou lições e métricas concretas."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Sidebar summary */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-3xl glass p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow-emerald">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold">Experiência</p>
                  <p className="text-xs text-muted-foreground">2+ anos no mercado</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.company} className="flex items-start gap-3">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        exp.current ? "bg-emerald-400 ring-4 ring-emerald-400/20" : "bg-muted-foreground/40"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.period}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-border/40 bg-background/30 p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Foco atual</p>
                <p className="mt-1">
                  Aprofundando em arquiteturas distribuídas, Next.js e cloud nativo —
                  mantendo o pé no mundo SAP/TMS.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/60 via-violet-400/40 to-transparent sm:left-6" />

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/40 bg-background/80 backdrop-blur-md sm:left-2 sm:h-11 sm:w-11">
                    <Building2 className="h-4 w-4 text-emerald-300 sm:h-5 sm:w-5" />
                    {exp.current && (
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="overflow-hidden rounded-3xl glass p-6 transition-shadow hover:shadow-premium">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {exp.company}
                          </h3>
                          {exp.current && (
                            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-emerald-400">{exp.role}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {exp.location} · {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

                    {/* Achievements */}
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/80">
                        Conquistas
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {exp.achievements.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-code text-[10px] text-muted-foreground"
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
