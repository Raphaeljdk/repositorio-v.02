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
const AUTO_PLAY_INTERVAL = 5000;
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
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function Testimonials() {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
  const visibleCount = isDesktop ? 3 : 1;

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxPage = Math.max(0, testimonials.length - visibleCount);

  const goTo = useCallback(
    (target: number) => {
      setPage((p) => {
        const clamped = Math.max(0, Math.min(target, maxPage));
        return clamped;
      });
    },
    [maxPage]
  );

  const prev = useCallback(() => goTo(page - 1), [goTo, page]);
  const next = useCallback(() => goTo(page + 1), [goTo, page]);

  /* Auto-play: start on mount, pause on hover */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, maxPage]);

  /* Visible slice */
  const visible = testimonials.slice(page, page + visibleCount);

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-32">
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
          {/* Navigation arrows */}
          <div className="relative">
            <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
              <button
                type="button"
                onClick={prev}
                disabled={page === 0}
                aria-label="Depoimento anterior"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--surface)] transition-all duration-200",
                  page === 0
                    ? "border-[var(--surface-border)] text-muted-foreground/40 cursor-not-allowed"
                    : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)] hover:scale-110 active:scale-95"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
              <button
                type="button"
                onClick={next}
                disabled={page >= maxPage}
                aria-label="Próximo depoimento"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--surface)] transition-all duration-200",
                  page >= maxPage
                    ? "border-[var(--surface-border)] text-muted-foreground/40 cursor-not-allowed"
                    : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)] hover:scale-110 active:scale-95"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((t) => (
                  <TestimonialCard key={t.name} testimonial={t} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === page
                    ? "w-6 bg-[var(--color-accent-copper)] shadow-[0_0_8px_rgba(212,119,92,0.4)]"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
              />
            ))}
          </div>

          {/* Mobile nav arrows */}
          <div className="mt-4 flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={prev}
              disabled={page === 0}
              aria-label="Depoimento anterior"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                page === 0
                  ? "border-[var(--surface-border)] text-muted-foreground/40 cursor-not-allowed"
                  : "border-[var(--surface-border)] text-foreground hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-code text-xs text-muted-foreground">
              {page + 1} / {maxPage + 1}
            </span>
            <button
              type="button"
              onClick={next}
              disabled={page >= maxPage}
              aria-label="Próximo depoimento"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                page >= maxPage
                  ? "border-[var(--surface-border)] text-muted-foreground/40 cursor-not-allowed"
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
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  const initials = getInitials(testimonial.name);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface card-glow group flex flex-col rounded-xl p-6 sm:p-8 transition-[border-color] duration-300 hover:border-[var(--color-accent-copper)]/30"
    >
      {/* Copper accent line */}
      <div className="h-0.5 w-8 bg-[var(--color-accent-copper)] transition-all duration-300 group-hover:w-12" />

      {/* Decorative quote mark */}
      <span className="mt-5 block font-display text-4xl leading-none text-[var(--color-accent-copper)]/20 select-none">
        &ldquo;
      </span>

      {/* Quote */}
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground/85 sm:text-base">
        {testimonial.quote}
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3 border-t border-[var(--surface-border)] pt-4">
        {/* Initials avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent-copper)]/40 bg-[var(--color-accent-copper)]/10">
          <span className="font-display text-xs font-bold text-[var(--color-accent-copper)]">
            {initials}
          </span>
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role}{" "}
            <span className="font-code text-[var(--color-accent-copper)]/70">@ {testimonial.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}