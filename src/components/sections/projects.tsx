"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  Eye,
  ArrowUpRight,
  Sparkles,
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
            eyebrow="03 / Projetos"
            title="Coisas que construí."
            description="Cada projeto é um caso de uso real — do SaaS em tempo real ao executive dashboard. Filtre e explore."
          />
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
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
                    layoutId="project-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all hover:border-emerald-400/40 hover:shadow-glow-emerald"
          >
            <Github className="h-4 w-4" />
            Ver todos os repositórios no GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const statusMap = {
    completed: { label: "Concluído", color: "text-emerald-300 bg-emerald-400/12" },
    "in-progress": { label: "Em progresso", color: "text-amber-300 bg-amber-400/12" },
    planned: { label: "Planejado", color: "text-violet-300 bg-violet-400/12" },
  } as const;
  const status = statusMap[project.status];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:shadow-premium",
        project.featured && "lg:col-span-1"
      )}
    >
      {/* Top banner with gradient + project initial */}
      <div className={cn("relative h-36 overflow-hidden bg-gradient-to-br sm:h-40", project.accent)}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Floating initial */}
        <span className="absolute right-4 top-3 font-display text-6xl font-extrabold leading-none text-white/20">
          {project.title.charAt(0)}
        </span>

        {/* Status pill */}
        <span
          className={cn(
            "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md",
            status.color
          )}
        >
          <CircleDot className="h-2.5 w-2.5" />
          {status.label}
        </span>

        {/* Featured star */}
        {project.featured && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            Destaque
          </span>
        )}

        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir ${project.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Código de ${project.title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="text-xs text-emerald-400">{project.subtitle}</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              <Sparkles className="h-2.5 w-2.5 text-amber-400" />
              {h}
            </span>
          ))}
        </div>

        {/* Tech */}
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
        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {project.stats.views}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {project.stats.likes}
            </span>
          </span>
          <span className="font-medium text-foreground/80">{project.role}</span>
        </div>

        {/* Difficulty bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Complexidade</span>
            <span className="font-code text-emerald-400">{project.difficulty}%</span>
          </div>
          <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-muted/60">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.difficulty}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full rounded-full bg-brand-gradient"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
