"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  MapPin,
  GraduationCap,
  Code2,
  MousePointerClick,
} from "lucide-react";
import { personal } from "@/lib/data";

const ROLES = personal.roles;

export function Hero() {
  const reduce = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else {
      // Defer state reset to avoid synchronous setState in effect body
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      }, 220);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx]);

  const container = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    }),
    []
  );
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Left — copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          {/* Availability pill */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {personal.availability}
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="mt-6 font-code text-sm uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span className="text-emerald-400">&gt;</span> Olá, mundo. Eu sou
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block">Raphael</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
              Freitas
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div variants={item} className="mt-5 flex items-center gap-2 font-mono text-base sm:text-lg">
            <Code2 className="h-5 w-5 text-amber-400" />
            <span className="text-muted-foreground">const role =</span>
            <span className="text-foreground">
              &ldquo;
              <span className="text-gradient-emerald font-semibold">{typed}</span>
              <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-emerald-400 align-middle" />
              &rdquo;
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {personal.bio}
          </motion.p>

          {/* Meta chips */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-400" /> {personal.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-violet-400" /> {personal.degree}
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-emerald transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              Ver projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all hover:border-emerald-400/40 hover:shadow-glow-emerald"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              Vamos colaborar
            </a>
          </motion.div>

          {/* Hint */}
          <motion.div
            variants={item}
            className="mt-10 hidden items-center gap-2 text-xs text-muted-foreground/70 lg:flex"
          >
            <MousePointerClick className="h-3.5 w-3.5" />
            Role para explorar o portfólio
          </motion.div>
        </motion.div>

        {/* Right — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <HeroVisual reduce={!!reduce} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/60 md:flex"
        aria-label="Rolar para sobre"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />
        </span>
      </motion.a>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative aspect-square">
      {/* Conic glow ring */}
      <div
        className="absolute inset-0 animate-spin-slow rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, #10b981, #14b8a6, #06b6d4, #8b5cf6, #f59e0b, #10b981)",
        }}
        aria-hidden
      />
      {/* Rotating dashed ring */}
      <div
        className="absolute inset-4 rounded-full border border-dashed border-emerald-400/30"
        style={{ animation: reduce ? "none" : "spin 24s linear infinite reverse" }}
        aria-hidden
      />
      {/* Avatar image */}
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute inset-6 overflow-hidden rounded-full border border-white/10 shadow-premium"
      >
        <img
          src="/avatar.png"
          alt="Raphael Freitas — Full Stack Developer"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </motion.div>

      {/* Floating badge — SAP */}
      <motion.div
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.4 }}
        className="absolute -left-4 top-12 rounded-2xl glass-strong px-3 py-2 text-xs shadow-premium sm:-left-6"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
            <Code2 className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-semibold">SAP ABAP</p>
            <p className="text-[10px] text-muted-foreground">Corporate</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — React */}
      <motion.div
        animate={reduce ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 0.8 }}
        className="absolute -right-3 top-1/3 rounded-2xl glass-strong px-3 py-2 text-xs shadow-premium sm:-right-6"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-semibold">React / Next</p>
            <p className="text-[10px] text-muted-foreground">Frontend</p>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — Node */}
      <motion.div
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.2 }}
        className="absolute -left-2 bottom-10 rounded-2xl glass-strong px-3 py-2 text-xs shadow-premium sm:-left-4"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
            <Code2 className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-semibold">Node.js</p>
            <p className="text-[10px] text-muted-foreground">Backend</p>
          </div>
        </div>
      </motion.div>

      {/* Exp years badge */}
      <motion.div
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.2 }}
        className="absolute -bottom-2 right-6 rounded-2xl bg-brand-gradient px-4 py-3 text-white shadow-glow-emerald"
      >
        <p className="font-display text-2xl font-bold leading-none">2+</p>
        <p className="text-[10px] uppercase tracking-wider opacity-80">anos exp.</p>
      </motion.div>
    </div>
  );
}
