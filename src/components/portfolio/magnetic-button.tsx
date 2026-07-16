"use client";

import { useCallback, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { motion, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
} & ComponentPropsWithoutRef<"a"> &
  ComponentPropsWithoutRef<"button">;

const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export function MagneticButton({
  children,
  className,
  as = "button",
  ...rest
}: MagneticButtonProps) {
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDist = 8;

    const offsetX = Math.max(-maxDist, Math.min(maxDist, (e.clientX - centerX) * 0.15));
    const offsetY = Math.max(-maxDist, Math.min(maxDist, (e.clientY - centerY) * 0.15));

    x.set(offsetX);
    y.set(offsetY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", ...springConfig }}
      {...rest}
    >
      {children}
    </Component>
  );
}