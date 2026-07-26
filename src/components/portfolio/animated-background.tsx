"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

/**
 * Subtle atmospheric background with more dynamic orbs.
 */
export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  const orbs = mounted
    ? [
        {
          className: "absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full",
          style: {
            // Orb 1 — Cinnabar Red (primary brand accent)
            background: isDark
              ? "radial-gradient(circle, rgba(229,80,80,0.18) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(217,56,56,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          },
          animate: {
            x: [0, 30, -15, 25, -20, 0],
            y: [0, 20, -25, 10, -15, 0],
            opacity: [0.7, 1, 0.75, 0.9, 0.7, 1],
            scale: [1, 1.05, 0.98, 1.03, 1],
          },
          transition: {
            x: { duration: 26, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 22, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
        {
          className: "absolute top-1/3 -right-24 h-[36rem] w-[36rem] rounded-full",
          style: {
            // Orb 2 — Deep Blue (sage/azul profundo)
            background: isDark
              ? "radial-gradient(circle, rgba(107,163,204,0.14) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(43,91,132,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
          },
          animate: {
            x: [0, -20, 15, -10, 0],
            y: [0, -35, 10, -30, 0],
            opacity: [1, 0.65, 0.95, 0.7, 1],
            scale: [1, 0.97, 1.04, 0.99, 1],
          },
          transition: {
            x: { duration: 24, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" as const },
            scale: { duration: 22, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
        {
          className: "absolute -bottom-20 left-1/4 h-[28rem] w-[28rem] rounded-full",
          style: {
            // Orb 3 — Ochre Gold
            background: isDark
              ? "radial-gradient(circle, rgba(242,193,78,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(242,193,78,0.08) 0%, transparent 70%)",
            filter: "blur(120px)",
          },
          animate: {
            x: [0, 25, 0, -25, 0],
            y: [0, -20, -35, -20, 0],
            opacity: [0.8, 1, 0.6, 1, 0.8],
            scale: [1, 1.06, 0.95, 1.02, 1],
          },
          transition: {
            x: { duration: 28, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 18, repeat: Infinity, ease: "easeInOut" as const },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
        // Orb 4 — subtle red+gold blend for atmospheric depth
        {
          className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(229,80,80,0.06) 0%, rgba(242,193,78,0.04) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(217,56,56,0.03) 0%, rgba(242,193,78,0.02) 40%, transparent 70%)",
            filter: "blur(140px)",
          },
          animate: {
            x: [0, -15, 20, -10, 0],
            y: [0, 15, -20, 25, 0],
            opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
          },
          transition: {
            x: { duration: 32, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration: 28, repeat: Infinity, ease: "easeInOut" as const },
            opacity: { duration: 20, repeat: Infinity, ease: "easeInOut" as const },
          },
        },
      ]
    : [];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid dot-grid-fade" />

      {/* Gradient orbs */}
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

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}