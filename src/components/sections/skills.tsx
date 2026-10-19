"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Search, X, ArrowUpRight, Code2, Server, Database, Wrench, Building2, Cloud, Brain, Layers, Crown, TrendingUp, Sprout } from "lucide-react";
import { skillCategories, skills, type Skill, type SkillCategory, type SkillTier } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";
import "./skills-panel.css";

type Category = SkillCategory | "all";
const AREAS = {
  all: { Icon: Layers, text: "Uma visão completa das ferramentas que fazem parte do meu desenvolvimento.", color: "#D93838" },
  frontend: { Icon: Code2, text: "Interfaces, acessibilidade e experiências que funcionam em qualquer tela.", color: "#2B83B9" },
  backend: { Icon: Server, text: "Lógica de negócio, APIs e integrações para conectar aplicações.", color: "#B77720" },
  database: { Icon: Database, text: "Estrutura, consultas e organização dos dados de cada aplicação.", color: "#9566C5" },
  corporate: { Icon: Building2, text: "Ferramentas corporativas conectadas à rotina e aos processos do negócio.", color: "#328B80" },
  cloud: { Icon: Cloud, text: "Infraestrutura e serviços de nuvem em constante aprendizado.", color: "#3489B6" },
  tools: { Icon: Wrench, text: "Do editor ao deploy: ferramentas que apoiam cada etapa do trabalho.", color: "#B66778" },
  ai: { Icon: Brain, text: "Inteligência artificial como apoio ao desenvolvimento e à produtividade.", color: "#D93838" },
};
const TIERS = [
  { id: "expert", label: "Especialista", Icon: Crown },
  { id: "proficient", label: "Proficiente", Icon: TrendingUp },
  { id: "learning", label: "Em desenvolvimento", Icon: Sprout },
] as const;
const categoryCounts = Object.fromEntries(skillCategories.map(c => [c.id, skills.filter(s => c.id === "all" || s.category === c.id).length]));
const tierCounts = Object.fromEntries(TIERS.map(t => [t.id, skills.filter(s => s.tier === t.id).length]));
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function Skills() {
  const [category, setCategory] = useState<Category>("frontend");
  const [tier, setTier] = useState<SkillTier | "all">("all");
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const area = AREAS[category];
  const title = category === "all" ? "Todas as tecnologias" : skillCategories.find(c => c.id === category)!.label;
  const filtered = useMemo(() => skills
    .filter(s => category === "all" || s.category === category)
    .filter(s => tier === "all" || s.tier === tier)
    .filter(s => normalize(s.name + " " + s.description).includes(normalize(query.trim())))
    .sort((a, b) => b.percent - a.percent), [category, tier, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey ||
        target.isContentEditable || target.closest("input, textarea, select") ||
        document.querySelector('[role="dialog"][data-state="open"]')) return;
      event.preventDefault();
      search.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function reset() {
    setCategory("all");
    setTier("all");
    setQuery("");
  }

  return (
    <section id="skills" className="skills-section relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="Stack & habilidades" title="Tecnologia com propósito." kanji={3}
          description="Explore minhas ferramentas por área e conheça como aplico cada uma no desenvolvimento." />
        <div className="skills-summary" role="group" aria-label="Filtrar habilidades por nível">
          {TIERS.map(({ id, label, Icon }) => (
            <button key={id} type="button" className={cn("skills-summary-item", tier === id && "is-selected")}
              aria-pressed={tier === id} onClick={() => setTier(tier === id ? "all" : id)}>
              <span className={`skills-summary-icon skills-summary-icon--${id}`}><Icon size={20} aria-hidden="true" /></span>
              <span><strong>{String(tierCounts[id]).padStart(2, "0")}</strong><span>{label}</span></span>
              <span className="skills-summary-check" aria-hidden="true">{tier === id ? "×" : "+"}</span>
            </button>
          ))}
        </div>
        <div className="skills-workspace" style={{ "--skill-accent": area.color } as CSSProperties}>
          <aside className="skills-sidebar">
            <div className="skills-sidebar-heading"><span>ÁREAS DE ATUAÇÃO</span><span>{skillCategories.length - 1}</span></div>
            <div className="skills-category-list" role="group" aria-label="Filtrar habilidades por área">
              {skillCategories.map(c => {
                const Icon = AREAS[c.id].Icon;
                return <button key={c.id} type="button" className={cn("skills-category", category === c.id && "is-selected")}
                  aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                  <Icon size={17} aria-hidden="true" /><span>{c.label}</span><small>{categoryCounts[c.id]}</small>
                </button>;
              })}
            </div>
            <p className="skills-sidebar-note">Aprendizado contínuo.<br /><strong>Aplicação em projetos reais.</strong></p>
          </aside>
          <div className="skills-content">
            <div className="skills-content-header">
              <div><p className="skills-eyebrow">MINHA CAIXA DE FERRAMENTAS</p><h3>{title}</h3><p>{area.text}</p></div>
              <span className="skills-area-icon"><area.Icon size={28} aria-hidden="true" /></span>
            </div>
            <div className="skills-toolbar">
              <div className="skills-search">
                <Search size={18} aria-hidden="true" />
                <label className="sr-only" htmlFor="skill-search">Buscar tecnologia ou habilidade</label>
                <input ref={search} id="skill-search" type="search" value={query}
                  onChange={e => { setQuery(e.target.value); setCategory("all"); }}
                  placeholder="Buscar tecnologia..." autoComplete="off" />
                {query && <button type="button" aria-label="Limpar busca" onClick={() => { setQuery(""); search.current?.focus(); }}><X size={16} /></button>}
              </div>
              <p className="skills-result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "tecnologia" : "tecnologias"}{tier !== "all" && <span> · {TIERS.find(t => t.id === tier)!.label}</span>}</p>
            </div>
            {filtered.length > 0 ? <div className="skills-card-grid">
              {filtered.map(skill => <TechnologyCard key={skill.name} skill={skill} />)}
            </div> : <div className="skills-empty"><Search size={28} aria-hidden="true" /><h4>Nenhuma tecnologia encontrada</h4><p>Experimente outro termo ou remova os filtros.</p><button type="button" onClick={reset}>Limpar todos os filtros</button></div>}
            <div className="skills-content-footer">
              <p>Níveis e percentuais representam minha autoavaliação.</p>
              <a href="#projects">Ver na prática <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologyCard({ skill }: { skill: Skill }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="technology-card">
      <div className="technology-card-top">
        <span className="technology-logo" aria-hidden="true">
          {imageFailed ? <span>{skill.name.slice(0, 2)}</span> : <img src={skill.icon} alt="" width={28} height={28} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />}
        </span>
        <span className={`technology-tier technology-tier--${skill.tier}`}>{TIERS.find(t => t.id === skill.tier)!.label}</span>
      </div>
      <h4>{skill.name}</h4>
      <p>{skill.description}</p>
      <div className="technology-card-bottom">
        <div className="technology-meta"><span>{skill.experience}</span><strong>{skill.percent}<span>%</span></strong></div>
        <div className="technology-progress" role="meter" aria-label={`Autoavaliação em ${skill.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.percent}>
          <span style={{ width: `${skill.percent}%` }} />
        </div>
        <span className="technology-level">{skill.level}</span>
      </div>
    </article>
  );
}
