"use client";

import { useCallback, type ReactNode } from "react";
import { motion, useSpring, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type MagneticButtonProps = { children: ReactNode; className?: string } & (
  | ({ as: "a" } & HTMLMotionProps<"a">)
  | ({ as?: "button" } & HTMLMotionProps<"button">)
);

const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export function MagneticButton({
  children,
  className,
  as = "button",
  ...rest
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDist = 8;

    const offsetX = Math.max(-maxDist, Math.min(maxDist, (e.clientX - centerX) * 0.15));
    const offsetY = Math.max(-maxDist, Math.min(maxDist, (e.clientY - centerY) * 0.15));

    x.set(offsetX);
    y.set(offsetY);
  }, [x, y, reduce]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      className={className}
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", ...springConfig }}
      {...(rest as HTMLMotionProps<"a"> & HTMLMotionProps<"button">)}
    >
      {children}
    </Component>
  );
}
