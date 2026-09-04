"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, TrendingUp, Sprout, Sparkles } from "lucide-react";
import { skillCategories, skills, type SkillCategory, type SkillTier } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";
import { useCardGlow } from "@/hooks/use-card-glow";
import { KanjiBackdrop } from "@/components/portfolio/signature";
import BorderGlow from "@/components/portfolio/border-glow";
import SkillsCarousel from "@/components/portfolio/skills-carousel";
import LogoLoop from "@/components/portfolio/logo-loop";
import GradualBlur from "@/components/portfolio/gradual-blur";

type Filter = SkillCategory | "all";
type TierView = "tiers" | "categories" | "carousel";

const ACCENT_COLORS = ["#D93838", "#F2C14E", "#2B5B84", "#B91C1C", "#9A3412", "#7C2D12", "#E55050"] as const;

const TIER_CONFIG: Record<SkillTier, { label: string; sublabel: string; Icon: typeof Crown; color: string; ringColor: string }> = {
  expert: {
    label: "Especialistas",
    sublabel: "Domínio profundo — o eixo do T",
    Icon: Crown,
    color: "text-[var(--color-accent-gold)]",
    ringColor: "ring-[var(--color-accent-gold)]/25",
  },
  proficient: {
    label: "Proficientes",
    sublabel: "Trabalho diário — a barra do T",
    Icon: TrendingUp,
    color: "text-[var(--color-accent-copper)]",
    ringColor: "ring-[var(--color-accent-copper)]/20",
  },
  learning: {
    label: "Em Desenvolvimento",
    sublabel: "Explorando e crescendo",
    Icon: Sprout,
    color: "text-[var(--color-accent-sage)]",
    ringColor: "ring-[var(--color-accent-sage)]/20",
  },
};

const tierOrder: SkillTier[] = ["expert", "proficient", "learning"];

// Pre-sorted tier groups (already sorted by percent in data.ts)
function getTierGroups() {
  return tierOrder.map((tier) => ({
    tier,
    skills: skills.filter((s) => s.tier === tier),
  }));
}

const tierGroups = getTierGroups();
const expertCount = tierGroups.find((g) => g.tier === "expert")!.skills.length;
const proficientCount = tierGroups.find((g) => g.tier === "proficient")!.skills.length;
const learningCount = tierGroups.find((g) => g.tier === "learning")!.skills.length;

/* ─── LogoLoop data — tech logos from skills ─── */
const skillsLogoItems = skills
  .filter((s) => s.percent >= 60)
  .sort((a, b) => b.percent - a.percent)
  .slice(0, 12)
  .map((s) => ({
    src: s.icon,
    alt: s.name,
    title: s.name,
    href: `https://www.google.com/search?q=${encodeURIComponent(s.name + " technology")}`,
  }));

const skillsLogoItems2 = skills
  .filter((s) => s.percent < 60 || s.percent >= 60)
  .sort((a, b) => a.percent - b.percent)
  .slice(0, 12)
  .map((s) => ({
    src: s.icon,
    alt: s.name,
    title: s.name,
    href: `https://www.google.com/search?q=${encodeURIComponent(s.name + " technology")}`,
  }));

export function Skills() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<TierView>("carousel");

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

  const filteredTierGroups = useMemo(() => {
    if (query || filter !== "all") {
      return null;
    }
    return tierOrder.map((tier) => ({
      tier,
      skills: skills.filter((s) => s.tier === tier),
    }));
  }, [filter, query]);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <KanjiBackdrop kanji="技" side="right" top={8} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--color-accent-copper)]/[0.03] blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Stack"
          title="Ferramentas que dominou."
          kanji={3}
          description="Perfil T-shaped: domínio profundo no eixo, amplitude na barra. Rankeadas por proficiência real."
        />

        {/* ── CAROUSEL VIEW ── */}
        {view === "carousel" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-col items-center gap-8"
          >
            <div className="w-full max-w-md mx-auto" style={{ minHeight: "420px", position: "relative" }}>
              <SkillsCarousel
                baseWidth={380}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            </div>

            {/* Quick stats under carousel */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Expert", count: expertCount, color: "var(--color-accent-gold)" },
                { label: "Proficient", count: proficientCount, color: "var(--color-accent-copper)" },
                { label: "Learning", count: learningCount, color: "var(--color-accent-sage)" },
              ].map((t) => (
                <BorderGlow
                  key={t.label}
                  edgeSensitivity={25}
                  glowColor="10 80 60"
                  backgroundColor="var(--card-bg, #161614)"
                  borderRadius={12}
                  glowRadius={20}
                  glowIntensity={0.8}
                  coneSpread={30}
                  colors={["#D93838", "#F2C14E", "#2B5B84"]}
                  className="inline-flex"
                >
                  <div className="flex items-center gap-2 px-4 py-2">
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: t.color }} />
                    <span className="font-code text-xs text-muted-foreground">{t.label}</span>
                    <span className="font-code text-sm font-bold" style={{ color: t.color }}>{t.count}</span>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </motion.div>
        )}

        {/* T-shaped diagram - visual summary (only in tiers view) */}
        {view === "tiers" && !query && filter === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 card-surface rounded-xl p-5 sm:p-6"
          >
            <div className="flex items-end justify-center gap-1 sm:gap-2">
              <div className="flex items-end gap-1 sm:gap-1.5 mb-2">
                {["Frontend", "Backend", "DB", "Tools", "Corp", "Cloud", "IA"].map((cat, i) => (
                  <motion.div
                    key={cat}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                    className="flex flex-col items-center gap-1"
                    style={{ transformOrigin: "bottom" }}
                  >
                    <span className="font-code text-[9px] text-muted-foreground hidden sm:block">{cat}</span>
                    <div className="h-3 w-6 sm:h-4 sm:w-8 rounded-t-sm bg-[var(--color-accent-copper)]/60" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mx-auto w-12 sm:w-16">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-16 sm:h-20 w-full rounded-b-sm bg-[var(--color-accent-gold)]/70"
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] font-code text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-sm bg-[var(--color-accent-gold)]/70" />
                Eixo: {expertCount} especialistas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-sm bg-[var(--color-accent-copper)]/60" />
                Barra: {proficientCount} proficientes + {learningCount} explorando
              </span>
            </div>
          </motion.div>
        )}

        {/* Controls row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* View toggle + Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-[var(--surface-border)] p-0.5">
              <button
                type="button"
                onClick={() => { setView("carousel"); setFilter("all"); }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all min-h-[36px] inline-flex items-center gap-1.5",
                  view === "carousel" ? "bg-[var(--color-accent-copper)] text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sparkles className="h-3 w-3" />
                Carousel
              </button>
              <button
                type="button"
                onClick={() => { setView("tiers"); setFilter("all"); }}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all min-h-[36px]",
                  view === "tiers" ? "bg-[var(--color-accent-copper)] text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                T-Shaped
              </button>
              <button
                type="button"
                onClick={() => setView("categories")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all min-h-[36px]",
                  view === "categories" ? "bg-[var(--color-accent-copper)] text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Categorias
              </button>
            </div>

            {view === "categories" && (
              <div className="flex flex-wrap gap-1.5">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilter(cat.id as Filter)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium active:scale-[0.97] transition-all min-h-[36px] inline-flex items-center",
                      filter === cat.id
                        ? "bg-[var(--color-accent-copper)] text-white shadow-[0_0_12px_rgba(220,38,38,0.3)]"
                        : "border border-[var(--surface-border)] text-muted-foreground hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search — only in tiers/categories */}
          {view !== "carousel" && (
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
          )}
        </motion.div>

        {/* TIER VIEW — grouped by proficiency */}
        {view === "tiers" && filteredTierGroups ? (
          <div className="mt-10 space-y-10">
            {filteredTierGroups.map(({ tier, skills: tierSkills }, groupIdx) => {
              const config = TIER_CONFIG[tier];
              const TierIcon = config.Icon;
              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
                >
                  {/* Tier header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", config.ringColor, "ring-1")}>
                      <TierIcon className={cn("h-4 w-4", config.color)} />
                    </span>
                    <div>
                      <h3 className={cn("font-display text-base font-bold", config.color)}>
                        {config.label}
                        <span className="ml-2 font-code text-xs font-normal text-muted-foreground">{tierSkills.length} skills</span>
                      </h3>
                      <p className="text-[11px] text-muted-foreground">{config.sublabel}</p>
                    </div>
                  </div>

                  {/* Tier grid */}
                  <div className={cn(
                    "grid gap-3",
                    tier === "expert"
                      ? "grid-cols-2 sm:grid-cols-3"
                      : tier === "proficient"
                        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  )}>
                    <AnimatePresence mode="popLayout">
                      {tierSkills.map((skill, i) => (
                        <SkillCard
                          key={skill.name}
                          skill={skill}
                          tier={tier}
                          rank={i + 1}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Separator between tiers */}
                  {groupIdx < tierOrder.length - 1 && (
                    <div className="mt-10 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[var(--surface-border)]" />
                      <span className="font-code text-[9px] text-muted-foreground/50">
                        {TIER_CONFIG[tierOrder[groupIdx + 1]].label.toUpperCase()}
                      </span>
                      <div className="h-px flex-1 bg-[var(--surface-border)]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : view === "categories" ? (
          /* CATEGORY / SEARCH VIEW — flat grid */
          <motion.div layout className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  tier={skill.tier}
                  rank={i + 1}
                  wide={i < 3}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {view !== "carousel" && filtered.length === 0 && (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            Nenhuma tecnologia encontrada para &ldquo;{query}&rdquo;.
          </div>
        )}
      </div>

      {/* ── LogoLoop marquee — tech logos scrolling ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="mt-12 relative"
        style={{ height: "80px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={skillsLogoItems}
          speed={80}
          direction="left"
          logoHeight={36}
          gap={48}
          pauseOnHover
          fadeOut
          scaleOnHover
          ariaLabel="Technology stack logos"
        />
        <GradualBlur
          position="bottom"
          height="2rem"
          strength={1.5}
          divCount={4}
          curve="bezier"
          opacity={0.9}
        />
      </motion.div>

      {/* Second row — reverse direction */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
        style={{ height: "80px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={skillsLogoItems2}
          speed={60}
          direction="right"
          logoHeight={32}
          gap={40}
          pauseOnHover
          fadeOut
          scaleOnHover
          ariaLabel="Technology stack logos row 2"
        />
        <GradualBlur
          position="bottom"
          height="2rem"
          strength={1.5}
          divCount={4}
          curve="bezier"
          opacity={0.9}
        />
      </motion.div>
    </section>
  );
}

function SkillCard({ skill, tier, rank, wide }: { skill: (typeof skills)[number]; tier: SkillTier; rank: number; wide?: boolean }) {
  const { ref, onMouseMove, onMouseLeave } = useCardGlow<HTMLDivElement>();
  const config = TIER_CONFIG[tier];
  const catColor = ACCENT_COLORS[skillCategories.findIndex((c) => c.id === skill.category) % ACCENT_COLORS.length] ?? ACCENT_COLORS[0];
  const isExpert = tier === "expert";

  return (
    <BorderGlow
      edgeSensitivity={25}
      glowColor="10 80 60"
      backgroundColor="var(--card-bg, #161614)"
      borderRadius={12}
      glowRadius={16}
      glowIntensity={0.6}
      coneSpread={30}
      colors={[catColor, "#F2C14E", "#2B5B84"]}
      className={cn(wide && "lg:col-span-2")}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, delay: rank * 0.03 }}
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "group p-4 border-l-2 relative overflow-hidden",
          isExpert && "ring-1 " + config.ringColor
        )}
        style={{ borderLeftColor: catColor }}
      >
        {/* Rank badge for experts */}
        {isExpert && (
          <span className="absolute top-2 right-2 font-code text-[9px] font-bold text-muted-foreground/40">
            #{rank}
          </span>
        )}

        <div className="flex items-center gap-3">
          <img
            src={skill.icon}
            alt={skill.name}
            className={cn("", isExpert ? "h-10 w-10" : "h-7 w-7")}
            loading="lazy"
          />
          <div className="min-w-0 flex-1">
            <h3 className={cn("font-semibold text-foreground truncate", isExpert ? "text-base" : "text-sm")}>
              {skill.name}
            </h3>
            <p className={cn("font-code text-[10px] text-muted-foreground", isExpert && "text-[11px]")}>
              {skill.level}
            </p>
          </div>
          <span className={cn("font-code font-bold", isExpert ? "text-lg" : "text-sm", config.color)}>
            {skill.percent}<span className={cn("text-muted-foreground", isExpert ? "text-[10px]" : "text-[9px]")}>%</span>
          </span>
        </div>

        {/* Description */}
        <p className={cn("mt-2 leading-relaxed text-muted-foreground", isExpert ? "text-xs line-clamp-2" : "text-[11px] line-clamp-1")}>
          {skill.description}
        </p>

        {/* Progress bar */}
        <div className="mt-3 relative progress-glow">
          <div className="flex items-center justify-between font-code text-[10px] text-muted-foreground">
            <span>{skill.experience}</span>
          </div>
          <div className={cn("mt-1 w-full overflow-hidden rounded-full bg-muted/60", isExpert ? "h-2" : "h-1.5")}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${catColor}, ${catColor}88)`,
                boxShadow: `0 0 ${isExpert ? 12 : 6}px ${catColor}40`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </BorderGlow>
  );
}
