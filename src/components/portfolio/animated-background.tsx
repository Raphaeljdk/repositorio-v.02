"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * Subtle atmospheric background.
 * - 2-3 very soft gradient orbs (blur 150px+, low opacity)
 * - Dot grid pattern
 * - Top vignette for navbar anchoring
 * NO canvas particles. NO aurora blobs.
 */
export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  // Use CSS variables for opacity so server/client match is consistent
  // The orbs use a fixed dark opacity, and we rely on the CSS custom properties
  // to handle the theme difference via the dot-grid colors.
  const orbs = mounted
    ? [
        {
          className: "absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          },
          // Diagonal drift — slow, subtle meander
          animate: {
            x: [0, 30, -15, 25, -20, 0],
            y: [0, 20, -25, 10, -15, 0],
            opacity: [0.7, 1, 0.75, 0.9, 0.7, 1],
          },
          transition: {
            x: { duration: 26, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 22, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
        {
          className: "absolute top-1/3 -right-24 h-[36rem] w-[36rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
            filter: "blur(100px)",
          },
          // Vertical float — gentle rise and fall
          animate: {
            x: [0, -20, 15, -10, 0],
            y: [0, -35, 10, -30, 0],
            opacity: [1, 0.65, 0.95, 0.7, 1],
          },
          transition: {
            x: { duration: 24, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
        {
          className: "absolute -bottom-20 left-1/4 h-[28rem] w-[28rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
            filter: "blur(120px)",
          },
          // Figure-8 like wandering path
          animate: {
            x: [0, 25, 0, -25, 0],
            y: [0, -20, -35, -20, 0],
            opacity: [0.8, 1, 0.6, 1, 0.8],
          },
          transition: {
            x: { duration: 28, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 18, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
      ]
    : [];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid dot-grid-fade" />

      {/* Gradient orbs — only render after mount to avoid hydration mismatch */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          style={orb.style}
          animate={orb.animate}
          transition={orb.transition}
        />
      ))}

      {/* Top vignette for navbar */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}