"use client";

import { useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "./about";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Responsive media query hook — avoids useState+useEffect for SSR  */
/* ------------------------------------------------------------------ */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const AUTO_PLAY_INTERVAL = 6000;
const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((p) => p.length > 0)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Per-slot animation variants (directional slide + fade)             */
/* ------------------------------------------------------------------ */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.55, 0, 1, 0.45] as const;

function slotVariants(direction: number) {
  return {
    enter: {
      opacity: 0,
      x: direction > 0 ? 48 : -48,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      x: direction > 0 ? -32 : 32,
      transition: {
        duration: 0.25,
        ease: EASE_IN,
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function Testimonials() {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
  const visibleCount = isDesktop ? 2 : 1;

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const maxPage = Math.max(0, testimonials.length - visibleCount);

  const goTo = useCallback(
    (target: number) => {
      setPage((p) => {
        const next = Math.max(0, Math.min(target, maxPage));
        setDirection(next > p ? 1 : -1);
        return next;
      });
    },
    [maxPage]
  );

  const prev = useCallback(() => goTo(page - 1), [goTo, page]);
  const next = useCallback(() => goTo(page + 1), [goTo, page]);

  /* Auto-play on desktop only, pause on hover */
  useEffect(() => {
    if (!isDesktop || paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, maxPage, isDesktop]);

  /* Visible slice */
  const visible = testimonials.slice(page, page + visibleCount);

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Subtle warm glow + diagonal pattern */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent-gold)]/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, var(--color-accent-copper) 35px, var(--color-accent-copper) 36px)" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Depoimentos"
          title="Quem trabalha comigo."
          description="Referências de quem acompanha minha evolução profissional."
        />

        {/* Carousel container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop nav arrows */}
          <div className="relative">
            <div className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
              <button
                type="button"
                onClick={prev}
                disabled={page === 0}
                aria-label="Depoimento anterior"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--surface)] transition-all duration-200",
                  page === 0
                    ? "border-[var(--surface-border)] text-muted-foreground/30 cursor-not-allowed"
                    : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)] hover:scale-110 active:scale-95"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
              <button
                type="button"
                onClick={next}
                disabled={page >= maxPage}
                aria-label="Próximo depoimento"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--surface)] transition-all duration-200",
                  page >= maxPage
                    ? "border-[var(--surface-border)] text-muted-foreground/30 cursor-not-allowed"
                    : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)] hover:scale-110 active:scale-95"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Cards grid — each slot has its own AnimatePresence */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {visible.map((t, idx) => (
                <AnimatePresence mode="wait" key={idx} custom={direction}>
                  <motion.div
                    key={t.name}
                    custom={direction}
                    variants={slotVariants(direction)}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <TestimonialCard testimonial={t} />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === page
                    ? "w-8 bg-[var(--color-accent-copper)] shadow-[0_0_10px_rgba(212,119,92,0.35)]"
                    : "w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {/* Mobile nav arrows */}
          <div className="mt-5 flex items-center justify-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={prev}
              disabled={page === 0}
              aria-label="Depoimento anterior"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                page === 0
                  ? "border-[var(--surface-border)] text-muted-foreground/30 cursor-not-allowed"
                  : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-code text-xs tabular-nums text-muted-foreground/60">
              {String(page + 1).padStart(2, "0")}{" "}
              <span className="text-muted-foreground/30">/</span>{" "}
              {String(maxPage + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={page >= maxPage}
              aria-label="Próximo depoimento"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                page >= maxPage
                  ? "border-[var(--surface-border)] text-muted-foreground/30 cursor-not-allowed"
                  : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual Card                                                    */
/* ------------------------------------------------------------------ */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const initials = getInitials(testimonial.name);

  return (
    <div className="card-surface card-glow group flex flex-col rounded-xl p-7 sm:p-8 transition-[border-color] duration-300 hover:border-[var(--color-accent-copper)]/30">
      {/* Decorative opening quote — large, subtle, top-left */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-1 font-display text-[5.5rem] leading-none text-[var(--color-accent-copper)]/[0.07] select-none pointer-events-none"
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <blockquote className="relative z-10 flex-1 text-[0.938rem] leading-[1.8] text-foreground/80 sm:text-[0.975rem]">
          {testimonial.quote}
        </blockquote>

        {/* Decorative closing quote — right-aligned, subtle */}
        <span
          aria-hidden="true"
          className="relative z-10 mt-2 block text-right font-display text-3xl leading-none text-[var(--color-accent-copper)]/[0.12] select-none"
        >
          &rdquo;
        </span>
      </div>

      {/* Copper gradient divider */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-[var(--color-accent-copper)]/30 via-[var(--color-accent-copper)]/8 to-transparent" />

      {/* Author + Star Rating */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Initials avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent-copper)]/30 bg-[var(--color-accent-copper)]/[0.06]">
            <span className="font-display text-xs font-semibold tracking-wide text-[var(--color-accent-copper)]">
              {initials}
            </span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {testimonial.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground/70">
              {testimonial.role}
            </p>
            <p className="mt-px truncate font-code text-[0.688rem] tracking-tight text-[var(--color-accent-copper)]/50">
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Star rating */}
        {testimonial.rating && (
          <div className="hidden sm:flex items-center gap-0.5" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill={i < testimonial.rating! ? "var(--color-accent-gold)" : "none"}
                stroke="var(--color-accent-gold)"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27l-4.94 2.43.94-5.49-4-3.9 5.53-.8L10 1.5z" />
              </svg>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}