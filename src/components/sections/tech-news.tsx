"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, ArrowRight, Cpu, Globe, Zap, Code2 } from "lucide-react";
import { techArticles } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  "React": { color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", icon: Code2 },
  "Next.js": { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: Globe },
  "TypeScript": { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Code2 },
  "IA": { color: "bg-red-500/10 text-red-400 border-red-500/20", icon: Cpu },
  "SAP B1": { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Zap },
  "Node.js": { color: "bg-green-500/10 text-green-400 border-green-500/20", icon: Globe },
};

const ALL_TAGS = ["Todos", ...Object.keys(TAG_STYLES)];

export function TechNews() {
  const [activeTag, setActiveTag] = useState("Todos");

  const filtered = activeTag === "Todos"
    ? techArticles
    : techArticles.filter((a) => a.tag === activeTag);

  return (
    <section id="news" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-brand-soft)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Blog"
          title="Artigos & Tendências"
          description="Conteúdo curado sobre as tecnologias que uso no dia a dia — React, Next.js, IA, SAP B1 e mais."
        />

        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {ALL_TAGS.map((tag) => {
            const style = TAG_STYLES[tag];
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.97]",
                  isActive
                    ? "bg-[var(--color-accent-copper)] text-white shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                    : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50"
                )}
              >
                {style && <style.icon className="h-3 w-3" />}
                {tag}
              </button>
            );
          })}
        </motion.div>

        {/* Articles grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <ArticleCard key={item.title} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Conteúdo curado sobre as tecnologias que domino</span>
        </motion.div>
      </div>
    </section>
  );
}

function ArticleCard({
  item,
  index,
}: {
  item: (typeof techArticles)[number];
  index: number;
}) {
  const tagStyle = TAG_STYLES[item.tag];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group card-surface shimmer-effect overflow-hidden"
    >
      {/* Top accent gradient line */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, var(--color-accent-copper), var(--color-accent-gold), var(--color-accent-sage))" }}
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Tag badge */}
        {tagStyle && (
          <div className="mb-3">
            <span className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-code text-[10px] font-medium",
              tagStyle.color
            )}>
              <tagStyle.icon className="h-2.5 w-2.5" />
              {item.tag}
            </span>
          </div>
        )}

        {/* Title */}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="group/title inline-flex items-start gap-2"
        >
          <h3 className="font-display text-base font-bold tracking-tight text-foreground leading-snug transition-colors group-hover/title:text-[var(--color-accent-copper)] line-clamp-2">
            {item.title}
          </h3>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:text-[var(--color-accent-copper)]" />
        </a>

        {/* Snippet */}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.snippet}
        </p>

        {/* Footer: source + date + external link */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--surface-border)]">
          <div className="flex items-center gap-3">
            <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              {item.source}
            </span>
            <span className="text-[10px] text-muted-foreground/60">·</span>
            <span className="text-[10px] text-muted-foreground">
              {item.date}
            </span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground opacity-0 transition-all hover:text-foreground hover:border-foreground group-hover:opacity-100"
            aria-label={`Abrir ${item.title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}