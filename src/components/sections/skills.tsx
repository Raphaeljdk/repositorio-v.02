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
          label="Stack"
          title="Ferramentas que dominou."
          description="25+ tecnologias distribuídas em 6 categorias. Do SAP ao React, do banco de dados ao cloud."
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
                  "relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === cat.id
                    ? "bg-[var(--color-accent-copper)] text-white"
                    : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)]"
                )}
              >
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
              className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)] lg:w-64"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--surface-border)] bg-muted px-1.5 py-0.5 font-code text-[10px] text-muted-foreground lg:block">
              /
            </kbd>
          </div>
        </div>

        {/* Bento grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "card-surface group rounded-xl p-4",
                  i < 3 && "lg:col-span-2"
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-8 w-8"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {skill.name}
                    </h3>
                    <p className="font-code text-[10px] text-muted-foreground">
                      {skill.level}
                    </p>
                  </div>
                </div>

                {/* Description — shown below name, no tooltip */}
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between font-code text-[10px] text-muted-foreground">
                    <span>{skill.experience}</span>
                    <span>{skill.percent}%</span>
                  </div>
                  <div className="mt-1 h-px w-full overflow-hidden rounded-full bg-muted/60">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-[var(--color-accent-copper)]"
                    />
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
      </div>
    </section>
  );
}