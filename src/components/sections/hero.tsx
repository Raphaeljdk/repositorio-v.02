"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { personal } from "@/lib/data";
import Image from "next/image";
import { MagneticButton } from "@/components/portfolio/magnetic-button";

const ROLES = personal.roles;

function useLocalTime() {
  const getTime = useCallback(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
  }, []);

  return useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, 1000);
      return () => clearInterval(id);
    },
    getTime,
    getTime
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const time = useLocalTime();
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      }, 220);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx]);

  // Parallax for avatar
  const { scrollY } = useScroll();
  const avatarY = useTransform(scrollY, [0, 600], [0, 60]);
  const avatarOpacity = useTransform(scrollY, [0, 500], [1, 0.6]);

  const container = useMemo(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    }),
    []
  );

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0 dot-grid dot-grid-fade" style={{ opacity: 0.6 }} />

      {/* Decorative geometric shapes */}
      <motion.div
        className="pointer-events-none absolute top-1/4 -right-20 h-80 w-80 rounded-full border border-[var(--color-accent-copper)]/[0.06]"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/3 -left-16 h-48 w-48 rounded-full border border-[var(--color-accent-sage)]/[0.05]"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute top-16 right-1/4 h-3 w-3 rounded-full bg-[var(--color-accent-gold)]/20"
        animate={reduce ? {} : { y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Left — copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* Monospace label with copper dot */}
          <motion.p
            variants={item}
            className="flex items-center gap-2 font-code text-xs uppercase tracking-[-0.02em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-copper)]" />
            Raphael Freitas
          </motion.p>

          {/* Name — huge display with split character reveal */}
          <motion.h1
            variants={item}
            className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
          >
            <span className="flex overflow-hidden">
              {"Freitas".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-2 font-code text-sm sm:text-base text-muted-foreground"
          >
            <span className="text-[var(--color-accent-copper)]">$</span>
            <span>{typed}</span>
            <span className="inline-block h-4 w-[2px] animate-pulse bg-[var(--color-accent-copper)] align-middle" />
          </motion.div>

          {/* Short bio — slightly bolder */}
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed"
          >
            {personal.bio}
          </motion.p>

          {/* Meta — location + degree, no icons */}
          <motion.div
            variants={item}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-code text-xs text-muted-foreground"
          >
            <span>{personal.location}</span>
            <span className="text-[var(--color-accent-copper)]">·</span>
            <span>{personal.degree}</span>
          </motion.div>

          {/* CTAs — improved hierarchy */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            {/* Primary CTA — larger, more prominent */}
            <MagneticButton
              as="a"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-accent-copper)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(212,119,92,0.3)] transition-all hover:shadow-[0_6px_28px_rgba(212,119,92,0.4)] hover:bg-[#E8886D] active:scale-[0.97]"
            >
              <Sparkles className="h-4 w-4" />
              Ver projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            {/* Secondary CTA — ghost, clearly subordinate */}
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-xl border border-[var(--surface-border)] px-5 py-3.5 text-sm font-medium text-muted-foreground transition-all hover:border-[var(--color-accent-copper)]/50 hover:text-foreground"
            >
              Vamos conversar
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right — avatar with rotating border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            style={reduce ? {} : { y: avatarY, opacity: avatarOpacity }}
            className="relative aspect-square"
          >
            {/* Rotating gradient border — thicker, more visible */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, #D4775C, #E8B44D, #5BB89A, #D4775C)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
              }}
              aria-hidden
            />
            {/* Outer ring glow */}
            <div
              className="absolute -inset-3 rounded-full opacity-20 blur-xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #D4775C, #E8B44D, #5BB89A, #D4775C)",
              }}
              aria-hidden
            />
            {/* Avatar image */}
            <div className="absolute inset-1.5 overflow-hidden rounded-full border border-[var(--surface-border)]">
              <Image
                src="/avatar.png"
                alt="Raphael Freitas"
                className="h-full w-full object-cover"
                width={400}
                height={400}
                priority
              />
            </div>
            {/* Bottom-left floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-4 z-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)]/95 backdrop-blur-sm px-3 py-2 shadow-lg"
            >
              <p className="font-code text-[10px] text-muted-foreground">São Paulo, BR</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">Estácio · 2028</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Terminal line at bottom — live clock + status */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex items-center gap-3 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)]/90 backdrop-blur-sm px-5 py-2.5 font-code text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent-sage)] opacity-40 animate-[ping_1.5s_ease-in-out_infinite]" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-sage)]" />
            </span>
            <span>online</span>
          </span>
          <span className="text-[var(--surface-border)]">|</span>
          <span>
            <span className="text-muted-foreground/60">BRT </span>
            <span className="text-foreground tabular-nums tracking-wider">{time}</span>
          </span>
          <span className="text-[var(--surface-border)]">|</span>
          <span>building</span>
          <span className="text-[var(--color-accent-sage)]">something cool</span>
          <span className="inline-block h-3.5 w-[1.5px] animate-pulse bg-[var(--color-accent-copper)]" />
        </div>
      </motion.div>

      {/* Year + location + scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3"
      >
        <span className="mono-label text-[10px]">2026 · São Paulo</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3 w-3 text-muted-foreground/50" />
        </motion.span>
      </motion.div>
    </section>
  );
}