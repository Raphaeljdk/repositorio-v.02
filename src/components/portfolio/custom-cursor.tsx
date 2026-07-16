"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSyncExternalStore } from "react";

function useIsTouch() {
  return useSyncExternalStore(
    () => () => {},
    () => ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    () => false
  );
}

/**
 * Custom cursor — small dot (8px) that follows mouse with spring delay.
 * Grows to 40px when hovering over interactive elements.
 * Hidden on touch devices.
 */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const size = useSpring(hovered ? 40 : 8, { damping: 20, stiffness: 300 });

  const updatePosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setVisible(true);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener("mousemove", updatePosition, { passive: true });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[tabindex]");
      setHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [updatePosition, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[10000] rounded-full mix-blend-difference"
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "var(--color-accent-copper)",
        opacity: visible ? 0.6 : 0,
      }}
      aria-hidden
    />
  );
}