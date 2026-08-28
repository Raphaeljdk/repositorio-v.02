"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
import { personal } from "@/lib/data";
import Image from "next/image";
import { HankoSeal } from "@/components/portfolio/signature";

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-32 pb-20"
    >
      {/* Faint dot grid */}
      <div className="pointer-events-none absolute inset-0 dot-grid dot-grid-fade opacity-50" />

      {/* SHOGUN differentiator — oversized 道 (The Way) calligraphy watermark.
          Ties to the logo's 学びの道 (Path of Learning). Quiet, static.
          Levemente mais visível em ambos os temas. */}
      <span
        className="kanji-watermark select-none hidden md:block"
        style={{
          fontSize: "min(34vw, 320px)",
          top: "8%",
          right: "-3%",
          opacity: 0.15,
        }}
        aria-hidden
      >
        道
      </span>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 sm:gap-16 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left — copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center lg:text-left"
        >
          {/* Small editorial label — location + year, no ping */}
          <motion.p
            variants={fadeUp}
            className="flex items-center justify-center gap-2 font-code text-[11px] uppercase tracking-[0.12em] text-muted-foreground lg:justify-start"
          >
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-copper)]" />
            {personal.location} · Portfólio 2026
          </motion.p>

          {/* Name — solid foreground, serif, no gradient.
              Signed with a personal hanko stamp (判子) — the
              hand-pressed red seal that marks this as his work. */}
          <motion.div variants={fadeUp} className="relative mt-5">
            <motion.h1
              className="relative font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.027em] sm:text-6xl md:text-7xl lg:text-[5rem]"
            >
              Raphael Freitas
            </motion.h1>
            {/* Personal hanko seal — rotated, ink-roughened, hand-pressed feel.
                Appears only on desktop to avoid crowding mobile. */}
            <HankoSeal
              size={64}
              animated
              className="absolute -right-2 top-2 hidden md:block lg:-right-6 lg:top-4"
            />
          </motion.div>

          {/* Role — static, concrete, no typewriter */}
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base font-medium text-foreground/75 sm:text-lg"
          >
            Desenvolvedor Full Stack
            <span className="mx-2 text-[var(--color-accent-copper)]">·</span>
            Eng. de Software
            <span className="mx-2 text-[var(--color-accent-copper)]">·</span>
            Automação com Python
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="mt-6 mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed lg:mx-0"
          >
            {personal.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="ink-bleed-host inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent-copper)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C12B2B] active:scale-[0.98]"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/curriculo-raphael-freitas.pdf"
              download
              className="ink-bleed-host inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-5 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-[var(--color-accent-copper)] hover:text-foreground"
            >
              <Download className="h-4 w-4" />
              Currículo
            </a>
          </motion.div>
        </motion.div>

        {/* Right — circular logo in a clean, static ring */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
        >
          <div className="relative aspect-square">
            {/* Single static ring — sumi border, no rotation, no gradient */}
            <div className="absolute -inset-2 rounded-full border border-[var(--color-accent-copper)]/15" />
            {/* Logo image — circular, clean, with a 6s breath cycle.
                The logo is a living bonsai, not a static asset. */}
            <div className="absolute inset-0 overflow-hidden rounded-full border border-[var(--surface-border)] bg-[var(--surface)] shadow-sumi-lg">
              <Image
                src="/raphael-logo.png"
                alt="Raphael Freitas — logo pessoal com dragão, bonsai e cerejeira"
                className="breathing-logo h-full w-full object-cover"
                width={500}
                height={500}
                priority
                unoptimized
              />
            </div>
            {/* Personal mark badge — ties to the logo's 学びの道 */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-1.5 shadow-sumi">
              <span className="font-display text-xs font-medium tracking-wide text-foreground/80">
                学びの道
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quiet scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted-foreground/60 transition-colors hover:text-foreground md:flex"
        aria-label="Rolar para a próxima seção"
      >
        <span className="font-code text-[10px] uppercase tracking-[0.12em]">Sobre</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3 w-3" />
        </motion.span>
      </motion.a>
    </section>
  );
}
