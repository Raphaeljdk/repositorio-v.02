"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import {
  Github,
  ExternalLink,
  Eye,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destaques" },
  { id: "completed", label: "Concluídos" },
  { id: "in-progress", label: "Em progresso" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "featured":
        return projects.filter((p) => p.featured);
      case "completed":
        return projects.filter((p) => p.status === "completed");
      case "in-progress":
        return projects.filter((p) => p.status !== "completed");
      default:
        return projects;
    }
  }, [filter]);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Projetos"
            title="Coisas que construí."
            description="Cada projeto é um caso de uso real — do SaaS em tempo real ao executive dashboard."
          />
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === f.id
                    ? "bg-[var(--color-accent-copper)] text-white"
                    : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid — featured span 2 cols */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/Raphaeljdk"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[var(--color-accent-copper)]"
          >
            <Github className="h-4 w-4" />
            Ver todos os repositórios
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDeg = 5;
    const rotY = ((e.clientX - centerX) / (rect.width / 2)) * maxDeg;
    const rotX = ((centerY - e.clientY) / (rect.height / 2)) * maxDeg;
    rotateX.set(rotX);
    rotateY.set(rotY);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const statusMap = {
    completed: "Concluído",
    "in-progress": "Em progresso",
    planned: "Planejado",
  } as const;

  return (
    <motion.article
      ref={cardRef as React.RefObject<HTMLElement>}
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] transition-[border-color] duration-300 hover:border-[var(--color-accent-copper)]",
        project.featured && "md:col-span-2 lg:col-span-1"
      )}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, var(--color-accent-copper), var(--color-accent-gold))` }} />

      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--color-accent-copper)]">{project.subtitle}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-0.5 font-code text-[10px] font-medium",
              project.status === "completed"
                ? "bg-[var(--color-accent-sage)]/10 text-[var(--color-accent-sage)]"
                : project.status === "in-progress"
                  ? "bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {statusMap[project.status]}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Highlights — clean text, no sparkles */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-md border border-[var(--surface-border)] px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Tech tags in monospace */}
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted/50 px-1.5 py-0.5 font-code text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--surface-border)] text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {project.stats.views}
            </span>
            <span>{project.role}</span>
          </span>

          {/* Links — clean icons on hover */}
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir ${project.title}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`Código de ${project.title}`}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}