"use client";

/**
 * ============================================================
 *  SHOGUN SIGNATURE SYSTEM — Raphael Freitas
 *  Unique, non-copyable brand effects tied to the personal
 *  identity: sumi-ink calligraphy, hanko seal (判子), sakura
 *  from the logo, and the 学びの道 (Path of Learning) mark.
 * ============================================================
 *
 *  Components:
 *    <HankoSeal />          — red Japanese signature stamp (RF + 道)
 *    <SumiBrushDivider />   — hand-painted ink brush stroke between sections
 *    <KanjiNumber n={3} />  — calligraphic section number (一二三四...)
 *    <SakuraPetalDrift />   — a single sakura petal that drifts across rarely
 *    <InkBleed/>            — wrapper that gives children an ink-bleed hover
 *    .breathing-logo        — CSS class for the subtle 6s breath on the logo
 *
 *  Design principles:
 *    - Every effect is hand-crafted, not template.
 *    - Tied to the brand identity (logo dragon/bonsai/sakura, 学びの道).
 *    - Quiet — never animated gradients, particles, or neon.
 *    - Respects prefers-reduced-motion (drift + breathing disabled).
 *    - Hydration-safe (SakuraPetalDrift renders null on SSR).
 */

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore, useEffect, useId, useState } from "react";

/* ------------------------------------------------------------------
 *  useMounted — hydration-safe mount detection
 * ------------------------------------------------------------------ */
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/* ------------------------------------------------------------------
 *  1. HANKO SEAL — 判子
 *  A personal red signature stamp. Square, hand-carved feel,
 *  slightly rotated, ink-roughened edges. Appears on hero + footer.
 * ------------------------------------------------------------------ */
type HankoSealProps = {
  size?: number;
  className?: string;
  variant?: "default" | "compact";
  /** subtle entrance animation (hero) vs static (footer) */
  animated?: boolean;
};

export function HankoSeal({
  size = 72,
  className = "",
  variant = "default",
  animated = false,
}: HankoSealProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  // useId() is deterministic across SSR and client — no hydration mismatch
  const reactId = useId();
  const id = `hanko-${reactId.replace(/:/g, "")}`;

  if (!mounted) return null;

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated && !reduce
    ? {
        initial: { opacity: 0, scale: 0.6, rotate: -12 },
        animate: { opacity: 1, scale: 1, rotate: -5 },
        transition: { delay: 1.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: "rotate(-5deg)",
      }}
      aria-label="Carimbo pessoal do Raphael Freitas"
      role="img"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ink-roughness filter — gives the carved-stone edge */}
          <filter id={`${id}-rough`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* ink-coverage variation — subtle unevenness inside the stamp */}
          <filter id={`${id}-texture`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              seed={3}
              result="tex"
            />
            <feColorMatrix in="tex" type="matrix" values="
              0 0 0 0 0.85
              0 0 0 0 0.22
              0 0 0 0 0.22
              0 0 0 0.18 0" result="texColor" />
            <feComposite in="texColor" in2="SourceGraphic" operator="in" result="texIn" />
            <feBlend in="SourceGraphic" in2="texIn" mode="multiply" />
          </filter>
        </defs>

        {/* The red stamp body — cinnabar, slightly rounded square */}
        <g filter={`url(#${id}-rough)`}>
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="6"
            ry="6"
            fill="var(--color-accent-copper)"
            className="fill-[var(--color-accent-copper)]"
          />
        </g>

        {/* Ink texture overlay */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="6"
          ry="6"
          fill="var(--color-accent-copper)"
          filter={`url(#${id}-texture)`}
          opacity="0.6"
        />

        {/* Carved characters (negative space) — RF stacked, or compact: 道 */}
        {variant === "compact" ? (
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontFamily="'Noto Serif JP', serif"
            fontWeight="700"
            fontSize="52"
            fill="var(--background)"
            className="fill-[var(--background)]"
          >
            道
          </text>
        ) : (
          <g fill="var(--background)" className="fill-[var(--background)]">
            {/* "RF" in a stylized carved arrangement */}
            <text
              x="50"
              y="44"
              textAnchor="middle"
              fontFamily="'Noto Serif JP', serif"
              fontWeight="700"
              fontSize="30"
              letterSpacing="2"
            >
              RF
            </text>
            {/* divider line carved into the stamp */}
            <rect x="22" y="52" width="56" height="1.6" fill="var(--background)" opacity="0.85" />
            {/* 学びの道 — the personal mark, tiny */}
            <text
              x="50"
              y="74"
              textAnchor="middle"
              fontFamily="'Noto Serif JP', serif"
              fontWeight="500"
              fontSize="11"
              letterSpacing="0.5"
              fill="var(--background)"
            >
              学びの道
            </text>
          </g>
        )}
      </svg>
    </Wrapper>
  );
}

/* ------------------------------------------------------------------
 *  2. SUMI BRUSH DIVIDER — 墨筆
 *  A hand-painted ink brush stroke that separates sections.
 *  SVG path with a turbulence-displacement filter for the
 *  rough, fibrous brush edge. Variable opacity = ink saturation.
 * ------------------------------------------------------------------ */
type SumiBrushDividerProps = {
  className?: string;
  /** stroke length factor — default 1 (full width) */
  width?: string;
};

export function SumiBrushDivider({ className = "", width = "100%" }: SumiBrushDividerProps) {
  const mounted = useMounted();
  const reactId = useId();
  const id = `sumi-${reactId.replace(/:/g, "")}`;

  if (!mounted) {
    return (
      <div
        className={`pointer-events-none ${className}`}
        aria-hidden
        style={{ height: "56px", width }}
      />
    );
  }

  return (
    <div
      className={`pointer-events-none flex items-center justify-center ${className}`}
      aria-hidden
      style={{ height: "56px", width }}
    >
      <svg
        viewBox="0 0 600 56"
        width="100%"
        height="56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          {/* Brush-edge roughness — fibrous, hand-painted feel */}
          <filter id={`${id}-brush`} x="-2%" y="-50%" width="104%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.016 0.7"
              numOctaves="3"
              seed={11}
              result="brushNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="brushNoise"
              scale="6.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* Ink saturation — variable opacity along the stroke length */}
          <linearGradient id={`${id}-saturation`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-ink)" stopOpacity="0" />
            <stop offset="10%" stopColor="var(--color-accent-ink)" stopOpacity="0.4" />
            <stop offset="40%" stopColor="var(--color-accent-ink)" stopOpacity="0.85" />
            <stop offset="60%" stopColor="var(--color-accent-ink)" stopOpacity="0.9" />
            <stop offset="90%" stopColor="var(--color-accent-ink)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-ink)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* The brush stroke as a FILLED shape — tapered at both ends,
            thick in the middle, like a sumi brush dragged across paper. */}
        <path
          d="M 6 28
             C 80 26, 140 24, 220 22
             C 300 19.5, 360 16, 420 14
             C 470 12.5, 520 11, 594 9
             L 592 16
             C 520 18, 470 20, 420 23
             C 360 26, 300 30, 220 34
             C 140 36, 80 38, 6 40
             Z"
          fill={`url(#${id}-saturation)`}
          filter={`url(#${id}-brush)`}
        />
        {/* A darker core — the "wet ink" center of the stroke */}
        <path
          d="M 50 29
             C 160 27, 280 25, 400 22.5
             C 480 21, 540 19.5, 590 18
             L 588 26
             C 540 27.5, 480 29, 400 31
             C 280 33.5, 160 35.5, 50 37
             Z"
          fill="var(--color-accent-ink)"
          opacity="0.6"
          filter={`url(#${id}-brush)`}
        />
        {/* Ink droplet — the brush paused momentarily here */}
        <ellipse
          cx="300"
          cy="27"
          rx="5"
          ry="4"
          fill="var(--color-accent-ink)"
          opacity="0.75"
          filter={`url(#${id}-brush)`}
        />
        {/* Tiny splatter — like a bristle flicked off the brush */}
        <circle cx="315" cy="16" r="1.2" fill="var(--color-accent-ink)" opacity="0.5" />
        <circle cx="285" cy="40" r="0.9" fill="var(--color-accent-ink)" opacity="0.45" />
        <circle cx="325" cy="38" r="0.7" fill="var(--color-accent-ink)" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------
 *  3. KANJI SECTION NUMBER — 漢数字
 *  Calligraphic section ordinal (一二三四五六七八) instead of
 *  "01 / 02 / 03". Small, red, slightly rotated — like a margin
 *  stamp in a Japanese manuscript.
 * ------------------------------------------------------------------ */
const KANJI_NUMS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export function KanjiNumber({ n, className = "" }: { n: number; className?: string }) {
  const kanji = KANJI_NUMS[n] || String(n);
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center font-display text-sm font-bold text-[var(--color-accent-copper)] ${className}`}
      style={{
        border: "1.5px solid var(--color-accent-copper)",
        borderRadius: "4px",
        transform: "rotate(-3deg)",
        background: "color-mix(in srgb, var(--color-accent-copper) 6%, transparent)",
        letterSpacing: "0",
      }}
      aria-label={`Seção ${n}`}
    >
      {kanji}
    </span>
  );
}

/* ------------------------------------------------------------------
 *  3b. KANJI BACKDROP — 背景漢字
 *  A large, faint kanji painted behind a section — like a sumi-e
 *  brushstroke soaking through washi paper. Each section gets a
 *  kanji tied to its theme. Quiet, never competes with content.
 * ------------------------------------------------------------------ */
type KanjiBackdropProps = {
  /** The kanji character to display (e.g. 学, 技, 創, 縁, 道) */
  kanji: string;
  /** Position: "left" or "right" (default right) */
  side?: "left" | "right";
  /** Vertical position as % from top (default 10) */
  top?: number;
  /** Font size — CSS length, default min(30vw, 280px) */
  size?: string;
  /** Opacity override (default uses .kanji-watermark CSS) */
  opacity?: number;
  className?: string;
};

export function KanjiBackdrop({
  kanji,
  side = "right",
  top = 10,
  size = "min(30vw, 280px)",
  opacity,
  className = "",
}: KanjiBackdropProps) {
  return (
    <span
      className={`kanji-watermark select-none hidden md:block ${className}`}
      style={{
        fontSize: size,
        top: `${top}%`,
        [side]: "-2%",
        ...(opacity !== undefined ? { opacity } : {}),
      }}
      aria-hidden
    >
      {kanji}
    </span>
  );
}

/* ------------------------------------------------------------------
 *  4. SAKURA PETAL DRIFT — 桜花
 *  A SINGLE petal that drifts diagonally across the viewport
 *  every ~28 seconds. Ties to the cherry blossom in the logo.
 *  NOT a particle system — one petal, rare, quiet.
 * ------------------------------------------------------------------ */
type SakuraPetalDriftProps = {
  /** interval between drifts, in seconds (default 28) */
  interval?: number;
  /** drift duration across screen, in seconds (default 16) */
  duration?: number;
};

export function SakuraPetalDrift({
  interval = 28,
  duration = 16,
}: SakuraPetalDriftProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const [driftId, setDriftId] = useState(0);

  useEffect(() => {
    if (!mounted || reduce) return;
    // randomize first delay so it doesn't always drift immediately on load
    const firstDelay = 8000 + Math.random() * 6000;
    const firstTimer = setTimeout(() => setDriftId((i) => i + 1), firstDelay);
    return () => clearTimeout(firstTimer);
  }, [mounted, reduce]);

  useEffect(() => {
    if (!mounted || reduce || driftId === 0) return;
    const timer = setTimeout(() => setDriftId((i) => i + 1), interval * 1000);
    return () => clearTimeout(timer);
  }, [driftId, mounted, reduce, interval]);

  if (!mounted || reduce) return null;
  if (driftId === 0) return null;

  // each drift gets a slightly different path (vertical offset + rotation)
  const seed = driftId;
  const startY = 8 + ((seed * 13) % 22); // 8%–30% from top
  const endY = 70 + ((seed * 7) % 22); // 70%–92%
  const startX = -8 + ((seed * 5) % 12); // -8% to 4%
  const endX = 95 + ((seed * 11) % 12); // 95%–107%
  const rotateStart = (seed * 37) % 360;
  const rotateEnd = rotateStart + 180 + ((seed * 23) % 180);
  const petalHue = (seed * 17) % 3; // 0=pink, 1=cinnabar-tinted, 2=gold-tinted

  const petalFill =
    petalHue === 0
      ? "#F2C14E"
      : petalHue === 1
        ? "#E8B96A"
        : "#D9A84E";

  return (
    <motion.div
      key={driftId}
      className="pointer-events-none fixed z-30"
      style={{
        top: `${startY}%`,
        left: `${startX}%`,
        width: "14px",
        height: "14px",
      }}
      initial={{
        x: 0,
        y: 0,
        opacity: 0,
        rotate: rotateStart,
      }}
      animate={{
        x: `${(endX - startX)}vw`,
        y: `${(endY - startY)}vh`,
        opacity: [0, 0.55, 0.55, 0.4, 0],
        rotate: rotateEnd,
      }}
      transition={{
        duration,
        ease: "linear",
        times: [0, 0.12, 0.65, 0.85, 1],
      }}
      aria-hidden
    >
      {/* a single sakura petal — notch at top, curved bottom */}
      <svg viewBox="0 0 20 20" width="14" height="14">
        <path
          d="M10 1 C 13 4, 17 8, 16 14 C 15 18, 12 19, 10 18 C 8 19, 5 18, 4 14 C 3 8, 7 4, 10 1 Z"
          fill={petalFill}
          opacity="0.85"
        />
        {/* petal vein */}
        <path
          d="M10 3 Q 10 10, 10 17"
          stroke="#9A6B1A"
          strokeWidth="0.4"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------
 *  5. INK BLEED — wrapper that gives children an ink-bleed hover.
 *  On hover, a soft radial gradient "bleeds" outward from the
 *  element, like sumi soaking into wet washi paper. Subtle.
 * ------------------------------------------------------------------ */
export function InkBleed({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={`ink-bleed-host relative ${className}`}>
      {children}
    </Tag>
  );
}
