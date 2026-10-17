"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Github, ArrowUpRight, ArrowRight, Check, Clock3 } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { ProjectModal } from "./project-modal";
import { SectionHeading } from "./about";
import { useCardGlow } from "@/hooks/use-card-glow";
import { cn } from "@/lib/utils";
import { KanjiBackdrop } from "@/components/portfolio/signature";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destaques" },
  { id: "completed", label: "Concluídos" },
  { id: "in-progress", label: "Em progresso" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered = useMemo(() => projects.filter(p =>
    filter === "all" || (filter === "featured" ? p.featured : filter === "completed" ? p.status === "completed" : p.status !== "completed")
  ), [filter]);

  function openProject(project: Project, event: MouseEvent<HTMLButtonElement>) {
    opener.current = event.currentTarget;
    setSelected(project);
  }

  return (
    <section id="projects" className="portfolio-projects relative scroll-mt-24 py-24 sm:py-32">
      <KanjiBackdrop kanji="創" side="left" top={5} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="Projetos" title="Ideias que viram realidade." kanji={4}
          description="Do primeiro cliente real às próximas ideias. Conheça os projetos, os desafios e o que existe por trás de cada entrega." />
        <div className="project-toolbar">
          <div className="project-filters" role="group" aria-label="Filtrar projetos">
            {FILTERS.map(f => (
              <button key={f.id} type="button" onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}
                className={cn("project-filter", filter === f.id && "is-active")}>
                {f.label}
              </button>
            ))}
          </div>
          <p className="project-count" role="status" aria-live="polite">{String(filtered.length).padStart(2, "0")} projetos</p>
        </div>
        <motion.div layout={!reduce} className="project-grid">
          <AnimatePresence initial={false}>
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onOpen={event => openProject(p, event)} />
            ))}
          </AnimatePresence>
        </motion.div>
        <ProjectModal project={selected} open={!!selected} onClose={() => setSelected(null)}
          onReturnFocus={() => opener.current?.focus({ preventScroll: true })} />
        <div className="mt-10 flex justify-center">
          <a href="https://github.com/Raphaeljdk" target="_blank" rel="noopener noreferrer" className="project-action">
            <Github size={16} aria-hidden="true" /> Explorar todos os repositórios <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (event: MouseEvent<HTMLButtonElement>) => void }) {
  const reduce = useReducedMotion();
  const { ref, onMouseMove, onMouseLeave } = useCardGlow<HTMLElement>();
  const [imageFailed, setImageFailed] = useState(false);
  const status = project.status === "completed" ? "Concluído" : project.status === "planned" ? "Planejado" : "Em desenvolvimento";

  return (
    <motion.article ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      layout={!reduce} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }} viewport={{ once: true, margin: "0px 0px -24px 0px" }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("project-card", project.spotlight && "project-card--spotlight", project.milestone && "project-card--milestone")}>
      <button type="button" className="project-preview" onClick={onOpen} aria-label={`Ver prévia e detalhes de ${project.title}`}>
        <span className={cn("project-fallback bg-gradient-to-br", project.accent)} aria-hidden="true">
          <span>{project.title}</span>
        </span>
        {project.image && !imageFailed && (
          <Image src={project.image} alt={project.imageCaption || `Prévia de ${project.title}`} fill
            unoptimized={project.image.startsWith("https://")} onError={() => setImageFailed(true)}
            sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 600px"
            className="project-preview-image" />
        )}
        <span className="project-preview-bar" aria-hidden="true"><i /><i /><i /><span>{project.spotlight ? "PROJETO EM DESTAQUE" : project.category}</span><ArrowUpRight size={16} /></span>
        <span className="project-preview-hint" aria-hidden="true">Explorar projeto <ArrowUpRight size={17} /></span>
      </button>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.category} / {project.year}</span>
          <span className="project-status">{project.status === "completed" ? <Check size={12} /> : <Clock3 size={12} />}{status}</span>
        </div>
        {project.milestone && <p className="project-milestone">{project.milestone}</p>}
        <h3><button type="button" onClick={onOpen} className="project-title-button">{project.title}</button></h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <div className="project-tags" aria-label="Tecnologias utilizadas">
          {project.technologies.map(t => <span key={t}>{t}</span>)}
        </div>
        <div className="project-actions">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={cn("project-action", project.spotlight && "project-action--primary")}>
              {project.spotlight ? "Visitar a Matilha Prado" : "Visitar projeto"}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <button type="button" onClick={onOpen} className="project-action project-action--quiet" aria-label={`Ver detalhes de ${project.title}`}>
            Detalhes <ArrowRight size={15} aria-hidden="true" />
          </button>
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action project-action--icon" aria-label={`Código de ${project.title}`}><Github size={17} /></a>}
        </div>
      </div>
    </motion.article>
  );
}
