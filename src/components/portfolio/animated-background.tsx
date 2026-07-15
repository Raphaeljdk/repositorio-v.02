"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Subtle atmospheric background.
 * - 2-3 very soft gradient orbs (blur 150px+, low opacity)
 * - Dot grid pattern
 * - Top vignette for navbar anchoring
 * NO canvas particles. NO aurora blobs.
 */
export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              ? "radial-gradient(circle, rgba(212,119,92,0.10) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(212,119,92,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          },
        },
        {
          className: "absolute top-1/3 -right-24 h-[36rem] w-[36rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(91,184,154,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(91,184,154,0.05) 0%, transparent 70%)",
            filter: "blur(100px)",
          },
        },
        {
          className: "absolute -bottom-20 left-1/4 h-[28rem] w-[28rem] rounded-full",
          style: {
            background: isDark
              ? "radial-gradient(circle, rgba(232,180,77,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(232,180,77,0.04) 0%, transparent 70%)",
            filter: "blur(120px)",
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
        <div key={i} className={orb.className} style={orb.style} />
      ))}

      {/* Top vignette for navbar */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}