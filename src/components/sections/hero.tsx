"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
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

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Left — copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* Monospace label */}
          <motion.p
            variants={item}
            className="font-code text-xs uppercase tracking-[-0.02em] text-muted-foreground"
          >
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

          {/* Short bio */}
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
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

          {/* CTAs */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              as="a"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent-copper)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E8886D] active:scale-[0.98]"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[var(--color-accent-copper)]"
            >
              Vamos conversar
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
            {/* Rotating gradient border */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow opacity-50"
              style={{
                background:
                  "conic-gradient(from 0deg, #D4775C, #E8B44D, #5BB89A, #D4775C)",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
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