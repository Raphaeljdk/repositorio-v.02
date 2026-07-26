"use client";

import { useSyncExternalStore, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Building2, ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Hook: responsive desktop detection via useSyncExternalStore       */
/* ------------------------------------------------------------------ */
function useIsDesktop() {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia("(min-width: 768px)");
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    []
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1] as const;

const summaryCards = [
  { label: `${experiences.length} experiências`, icon: Building2 },
  { label: "SAP + TMS", icon: Building2 },
  { label: "São Paulo", icon: MapPin },
];

/* ------------------------------------------------------------------ */
/*  Sub-component: Single Experience Entry                             */
/* ------------------------------------------------------------------ */
function ExperienceEntry({
  exp,
  index,
  isDesktop,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isDesktop: boolean;
}) {
  const isLeft = isDesktop && index % 2 === 0;
  const [showResponsibilities, setShowResponsibilities] = useState(
    isDesktop
  );

  const slideX = isDesktop ? (isLeft ? -24 : 24) : -24;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: EASE,
      }}
      className={cn(
        /* Desktop: alternating sides with a centered column */
        "relative md:w-[calc(50%-24px)]",
        isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
      )}
    >
      {/* Card */}
      <div
        className={cn(
          "card-surface rounded-xl p-5 sm:p-6",
          exp.current && "border-l-[3px] border-l-[var(--color-accent-copper)]",
          isDesktop && isLeft && "md:text-right",
          isDesktop && !isLeft && "md:text-left"
        )}
      >
        {/* Header row */}
        <div
          className={cn(
            "flex flex-wrap items-start gap-3",
            isDesktop && isLeft && "md:flex-row-reverse md:text-right"
          )}
        >
          <div className="flex-1 min-w-0">
            <div
              className={cn(
                "flex items-center gap-2",
                isDesktop && isLeft && "md:justify-end"
              )}
            >
              <Building2 className="h-5 w-5 shrink-0 text-[var(--color-accent-copper)]" />
              <h3 className="font-display text-xl font-extrabold text-foreground leading-tight">
                {exp.company}
              </h3>
              {exp.current && (
                <span className="relative inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent-copper)]/15 px-2.5 py-0.5 font-code text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-copper)]">
                  <span className="absolute inset-0 rounded-md bg-[var(--color-accent-copper)]/15 animate-[pulse_2.5s_ease-in-out_infinite]" />
                  <span className="relative">Atual</span>
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-semibold text-[var(--color-accent-copper)]">
              {exp.role}
            </p>
          </div>

          <div
            className={cn(
              "flex flex-col gap-1 font-code text-xs text-muted-foreground",
              isDesktop && isLeft && "md:items-start"
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {exp.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {exp.location} · {exp.type}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
          {exp.summary}
        </p>

        {/* Achievements */}
        {exp.achievements.length > 0 && (
          <div className="mt-5">
            <p className="mono-label mb-2.5">Conquistas</p>
            <ul className="space-y-2">
              {exp.achievements.map((a, ai) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + ai * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-foreground/90"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--color-accent-copper)]" />
                  <span>{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Collapsible Responsibilities */}
        {exp.responsibilities.length > 0 && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowResponsibilities((v) => !v)}
              className={cn(
                "group inline-flex items-center gap-1.5 font-code text-[10px] uppercase tracking-wider text-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]/80 transition-colors",
                isDesktop && isLeft && "md:ml-auto"
              )}
            >
              <span>
                {showResponsibilities
                  ? "Ocultar responsabilidades"
                  : "Ver responsabilidades"}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  showResponsibilities && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {showResponsibilities && (
                <motion.ul
                  key="responsibilities"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    {exp.responsibilities.map((r, ri) => (
                      <li
                        key={ri}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--color-accent-copper)]/60" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-5 flex flex-wrap gap-1.5"
        >
          {exp.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted/50 px-2.5 py-1 font-code text-[11px] text-foreground/80"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main: Experience Section                                           */
/* ------------------------------------------------------------------ */
export function Experience() {
  const isDesktop = useIsDesktop();

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Subtle warm gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-brand-soft)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Experiência"
          title="Onde tenho construído."
          kanji={7}
          description="Uma ponte entre o mundo corporativo regulado e o ecossistema web moderno."
        />

        <div className="mt-14">
          {/* Summary strip — 3 mini stat cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-12 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="card-surface rounded-lg px-3 py-3 sm:px-4 sm:py-4 flex flex-col items-center gap-1.5 text-center"
                >
                  <Icon className="h-4 w-4 text-[var(--color-accent-copper)]" />
                  <span className="font-code text-[11px] sm:text-xs font-medium text-foreground/90">
                    {card.label}
                  </span>
                  <span className="mx-auto h-[2px] w-6 rounded-full bg-[var(--color-accent-copper)]/60" />
                </div>
              );
            })}
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Centered vertical line (desktop) / left line (mobile) */}
            <div className="absolute top-2 bottom-2 w-px bg-[var(--surface-border)] left-4 sm:left-6 md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10">
              {experiences.map((exp, idx) => {
                const isLeft = isDesktop && idx % 2 === 0;

                return (
                  <div key={exp.company} className="relative">
                    {/* Timeline dot — positioned on the center line (desktop) or left (mobile) */}
                    <div
                      className={cn(
                        "absolute top-6 z-10 flex items-center justify-center",
                        "left-4 sm:left-6 md:left-1/2",
                        "-translate-x-1/2"
                      )}
                    >
                      <span
                        className={cn(
                          "block h-2.5 w-2.5 rounded-full border-[3px] border-[var(--surface)] bg-[var(--color-accent-copper)]",
                          exp.current && "animate-[pulse_2.5s_ease-in-out_infinite]"
                        )}
                      />
                    </div>

                    <ExperienceEntry
                      exp={exp}
                      index={idx}
                      isDesktop={isDesktop}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}