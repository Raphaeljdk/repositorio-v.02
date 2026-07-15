"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skills, type SkillCategory } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

type Filter = SkillCategory | "all";

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return skills
      .filter((s) => (filter === "all" ? true : s.category === filter))
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.percent - a.percent);
  }, [filter, query]);

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 / Stack"
          title="Ferramentas que dominou."
          description="25+ tecnologias distribuídas em 6 categorias. Do SAP ao React, do banco de dados ao cloud — full stack de verdade."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id as Filter)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  filter === cat.id
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground border border-border/60 bg-background/40 backdrop-blur-md"
                )}
              >
                {filter === cat.id && (
                  <motion.span
                    layoutId="skill-pill"
                    className={cn("absolute inset-0 -z-10 rounded-full bg-gradient-to-r", cat.color)}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar tecnologia..."
              className="w-full rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm backdrop-blur-md outline-none transition-all placeholder:text-muted-foreground/60 focus:border-emerald-400/50 focus:shadow-glow-emerald lg:w-64"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-code text-[10px] text-muted-foreground lg:block">
              /
            </kbd>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-4 transition-shadow hover:shadow-glow-emerald"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/10 via-transparent to-violet-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-8 w-8"
                    loading="lazy"
                  />
                  <span className="font-code text-[10px] font-semibold text-muted-foreground">
                    {skill.percent}%
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-semibold text-foreground">{skill.name}</h3>
                <p className="text-[10px] text-muted-foreground">{skill.level}</p>

                {/* Progress bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="h-full rounded-full bg-brand-gradient"
                  />
                </div>

                {/* Tooltip on hover (bottom) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-2 opacity-0 transition-all duration-300 group-hover:translate-y-[calc(100%-2px)] group-hover:opacity-100">
                  <div className="rounded-lg glass-strong p-2 text-[10px] leading-snug text-muted-foreground">
                    {skill.description}
                    <span className="mt-1 block font-code text-emerald-400">{skill.experience}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            Nenhuma tecnologia encontrada para &ldquo;{query}&rdquo;.
          </div>
        )}

        {/* Tech marquee */}
        <TechMarquee />
      </div>
    </section>
  );
}

function TechMarquee() {
  const items = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "SAP ABAP",
    "TMS",
    "Tailwind CSS",
    "PostgreSQL",
    "Java",
    "Spring Boot",
    "Python",
    "AWS",
    "Docker",
    "Git",
    "MongoDB",
    "Prisma ORM",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative mt-16 overflow-hidden mask-fade-x">
      <div className="flex w-max animate-marquee gap-4">
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/30 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
