"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  User,
  Eye,
  Target,
  Lightbulb,
  Zap,
  TrendingUp,
} from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl sm:inset-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:max-h-[85vh]"
          >
            <div className="relative rounded-t-2xl bg-[var(--surface)] border border-[var(--surface-border)] p-6 sm:rounded-xl sm:p-8">
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl sm:rounded-t-xl"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-accent-copper), var(--color-accent-gold))",
                }}
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Screenshot image */}
              {project.image && (
                <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-5 aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--surface)] to-transparent" />
                </div>
              )}

              {/* Category & Year */}
              <div className="flex items-center gap-2">
                <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
                {project.title}
              </h2>

              {/* Subtitle */}
              <p className="mt-1 text-sm text-[var(--color-accent-copper)]">
                {project.subtitle}
              </p>

              {/* Metrics Grid — shows quantified impact */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="mt-5">
                  <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-2.5 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Métricas de Impacto
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-[var(--surface-border)] bg-background/50 p-3 text-center"
                      >
                        <p className="font-display text-lg font-bold text-foreground tabular-nums">
                          {m.value}
                        </p>
                        <p className="mt-0.5 font-code text-[9px] uppercase tracking-wider text-muted-foreground">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study — Problem / Solution / Lessons */}
              {project.caseStudy && (
                <div className="mt-5 space-y-3">
                  <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5" />
                    Case Study
                  </p>

                  {/* Problem */}
                  <div className="rounded-lg border border-[var(--surface-border)] p-4">
                    <p className="font-code text-[9px] uppercase tracking-widest text-[var(--color-accent-copper)] mb-1.5">
                      Problema
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="rounded-lg border border-[var(--surface-border)] p-4">
                    <p className="font-code text-[9px] uppercase tracking-widest text-[#F97316] mb-1.5">
                      Solução
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.caseStudy.solution}
                    </p>
                  </div>

                  {/* Lessons */}
                  <div className="rounded-lg border border-[#10B981]/30 bg-[#10B981]/5 p-4">
                    <p className="font-code text-[9px] uppercase tracking-widest text-[#10B981] mb-1.5 flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" />
                      Lições Aprendidas
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.caseStudy.lessons}
                    </p>
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="mt-5">
                <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Destaques
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-[var(--surface-border)] bg-[var(--surface)] px-2.5 py-1 text-xs text-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-5">
                <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Tecnologias
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted/50 px-2 py-1 font-code text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats + Difficulty row */}
              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--surface-border)] pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {project.stats.views} views
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  {project.role}
                </span>
                <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Dificuldade</span>
                  <span className="inline-block h-1 w-16 overflow-hidden rounded-full bg-muted/60">
                    <span
                      className="block h-full bg-[var(--color-accent-copper)] transition-all"
                      style={{ width: `${project.difficulty}%` }}
                    />
                  </span>
                  <span className="font-code text-[10px] tabular-nums text-foreground/70">{project.difficulty}%</span>
                </span>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent-copper)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:brightness-110"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver ao vivo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[var(--color-accent-copper)]"
                  >
                    <Github className="h-4 w-4" />
                    Código-fonte
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}