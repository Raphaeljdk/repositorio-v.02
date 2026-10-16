"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onReturnFocus: () => void;
}

export function ProjectModal({ project, open, onClose, onReturnFocus }: ProjectModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={value => { if (!value) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="portfolio-dialog-overlay" />
        <Dialog.Content className="project-dialog" onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus(); }}>
          {project && (
            <>
              <div className="project-dialog-header">
                <span className="font-code text-xs text-muted-foreground">POR TRÁS DO PROJETO / {project.year}</span>
                <Dialog.Close className="project-dialog-close" aria-label="Fechar detalhes do projeto"><X size={20} /></Dialog.Close>
              </div>
              <div className="project-dialog-scroll">
                {project.image && (
                  <figure className="project-dialog-figure">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image src={project.image} alt={project.imageCaption || project.title} fill
                        unoptimized={project.image.startsWith("https://")} sizes="(max-width: 767px) 100vw, 760px" className="object-cover object-top" />
                    </div>
                    {project.imageCaption && <figcaption>{project.imageCaption}</figcaption>}
                  </figure>
                )}
                <div className="project-dialog-body">
                  {project.milestone && <p className="project-milestone">{project.milestone}</p>}
                  <p className="font-code text-xs uppercase tracking-wide text-muted-foreground">{project.category}</p>
                  <Dialog.Title className="mt-3 font-display text-3xl font-bold sm:text-4xl">{project.title}</Dialog.Title>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <Dialog.Description className="mt-5 text-base leading-relaxed text-muted-foreground">{project.description}</Dialog.Description>
                  {project.metrics && (
                    <dl className="project-dialog-metrics">
                      {project.metrics.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}
                    </dl>
                  )}
                  {project.caseStudy && (
                    <div className="project-case-study">
                      {[
                        { number: "01", label: "O desafio", text: project.caseStudy.problem },
                        { number: "02", label: "A solução", text: project.caseStudy.solution },
                        { number: "03", label: "O aprendizado", text: project.caseStudy.lessons },
                      ].map(item => <section key={item.number}><span aria-hidden="true">{item.number}</span><div><h3>{item.label}</h3><p>{item.text}</p></div></section>)}
                    </div>
                  )}
                  <h3 className="mt-7 text-sm font-semibold">Destaques</h3>
                  <ul className="project-highlights">{project.highlights.map(h => <li key={h}><ArrowUpRight size={14} aria-hidden="true" />{h}</li>)}</ul>
                  <h3 className="mt-6 text-sm font-semibold">Tecnologias</h3>
                  <div className="project-tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
                  <p className="mt-6 text-xs text-muted-foreground">{project.role} · {project.year}</p>
                </div>
              </div>
              <div className="project-dialog-footer">
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-action project-action--primary"><ExternalLink size={16} />Visitar projeto</a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action"><Github size={16} />Código-fonte</a>}
                <Dialog.Close className="project-action project-action--quiet">Voltar aos projetos</Dialog.Close>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
