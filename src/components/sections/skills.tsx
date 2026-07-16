"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skills, type SkillCategory } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";
import { useCardGlow } from "@/hooks/use-card-glow";

type Filter = SkillCategory | "all";

const ACCENT_COLORS = ["#DC2626", "#10B981", "#F97316", "#7C8CF8", "#B91C1C", "#9A3412"] as const;

function CategoryBar({ activeFilter, onSelect }: { activeFilter: Filter; onSelect: (f: Filter) => void }) {
  const categoryCounts = useMemo(() => {
    return (skillCategories.filter((c) => c.id !== "all") as { id: SkillCategory; label: string }[]).map((cat) => ({
      ...cat,
      count: skills.filter((s) => s.category === cat.id).length,
      avgPercent: Math.round(skills.filter((s) => s.category === cat.id).reduce((a, b) => a + b.percent, 0) / Math.max(1, skills.filter((s) => s.category === cat.id).length)),
    }));
  }, []);

  const total = categoryCounts.reduce((a, c) => a + c.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mt-8"
    >
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/40">
        {categoryCounts.map((cat, i) => {
          const width = (cat.count / total) * 100;
          const isActive = activeFilter === cat.id || activeFilter === "all";
          return (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => onSelect(activeFilter === cat.id ? "all" : cat.id)}
              className={cn(
                "relative h-full transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-40"
              )}
              style={{ width: `${width}%`, backgroundColor: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
              whileHover={{ opacity: 1, scaleY: 1.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              title={`${cat.label}: ${cat.count} tecnologias · ${cat.avgPercent}% avg`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {categoryCounts.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(activeFilter === cat.id ? "all" : cat.id)}
            className={cn(
              "inline-flex items-center gap-1.5 font-code text-[10px] transition-colors",
              activeFilter === cat.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: ACCENT_COLORS[i % ACCENT_COLORS.length] }} />
            {cat.label} <span className="text-muted-foreground/60">{cat.count}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName) &&
        document.body.style.overflow !== "hidden"
      ) {
        e.preventDefault();
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          document.getElementById("skill-search")?.focus();
        }, 400);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    return skills
      .filter((s) => (filter === "all" ? true : s.category === filter))
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => b.percent - a.percent);
  }, [filter, query]);

  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Subtle radial glow behind the grid */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--color-accent-copper)]/[0.03] blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Stack"
          title="Ferramentas que dominou."
          description="25+ tecnologias distribuídas em 6 categorias. Do SAP ao React, do banco de dados ao cloud."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id as Filter)}
                className={cn(
                  "relative rounded-lg px-4 py-1.5 text-sm font-medium active:scale-[0.97] transition-all",
                  filter === cat.id
                    ? "bg-[var(--color-accent-copper)] text-white shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                    : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <input
              id="skill-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar tecnologia..."
              className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)] lg:w-64"
            />
            <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--surface-border)] bg-muted px-1.5 py-0.5 font-code text-[10px] text-muted-foreground lg:block">
              /
            </kbd>
          </motion.div>
        </motion.div>

        {/* Category overview bar — horizontal stacked bar showing distribution */}
        <CategoryBar activeFilter={filter} onSelect={setFilter} />

        {/* Bento grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} wide={i < 3} />
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

function SkillCard({ skill, wide }: { skill: (typeof skills)[number]; wide: boolean }) {
  const { ref, onMouseMove, onMouseLeave } = useCardGlow<HTMLDivElement>();

  const catColor = ACCENT_COLORS[skillCategories.findIndex((c) => c.id === skill.category) % ACCENT_COLORS.length] ?? ACCENT_COLORS[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "card-surface group rounded-xl p-4 border-l-2",
        wide && "lg:col-span-2"
      )}
      style={{ borderLeftColor: catColor }}
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
  );
}