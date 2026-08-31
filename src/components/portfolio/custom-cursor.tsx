"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useSyncExternalStore } from "react";
import { ArrowUpRight, Pointer, Type, Menu, X, ExternalLink, Copy, Mail, ChevronUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function useIsTouch() {
  return useSyncExternalStore(
    () => () => {},
    () => ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    () => false
  );
}

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

type CursorState = "default" | "link" | "button" | "text" | "icon" | "close" | "copy" | "scroll-up";

const STATE_ICONS: Record<CursorState, { Icon: LucideIcon; size: number } | null> = {
  default: null,
  link: { Icon: ExternalLink, size: 12 },
  button: { Icon: Pointer, size: 12 },
  text: { Icon: Type, size: 11 },
  icon: { Icon: Menu, size: 11 },
  close: { Icon: X, size: 12 },
  copy: { Icon: Copy, size: 11 },
  "scroll-up": { Icon: ChevronUp, size: 12 },
};

const RING_SIZE: Record<CursorState, number> = {
  default: 36,
  link: 48,
  button: 52,
  text: 44,
  icon: 40,
  close: 48,
  copy: 44,
  "scroll-up": 44,
};

const DOT_SIZE: Record<CursorState, number> = {
  default: 6,
  link: 6,
  button: 6,
  text: 3,
  icon: 6,
  close: 6,
  copy: 6,
  "scroll-up": 6,
};

/**
 * Premium custom cursor with contextual icons.
 *
 * - Inner dot (copper) follows mouse precisely with fast spring
 * - Outer ring follows with slower spring, grows on interactive elements
 * - Contextual icon appears inside the ring on hover (link, button, text, etc.)
 * - Click ripple effect
 * - mix-blend-difference for contrast on any background
 * - Hidden on touch devices, null on SSR
 */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const mounted = useMounted();
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [clicking, setClicking] = useState(false);
  const ripplesRef = useRef<Array<{ id: number; x: number; y: number }>>([]);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot — fast, precise
  const dotX = useSpring(cursorX, { damping: 28, stiffness: 400, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 28, stiffness: 400, mass: 0.3 });

  // Outer ring — slower, organic feel
  const ringX = useSpring(cursorX, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 22, stiffness: 180, mass: 0.6 });

  const ringSize = useSpring(RING_SIZE[cursorState], { damping: 20, stiffness: 280 });
  const dotSize = useSpring(DOT_SIZE[cursorState], { damping: 25, stiffness: 350 });

  const updatePosition = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setVisible(true);
  }, [cursorX, cursorY]);

  const detectState = useCallback((target: HTMLElement): CursorState => {
    // Check for close button first (X icon context)
    if (target.closest("[data-cursor='close']")) return "close";
    if (target.closest("[data-cursor='copy']")) return "copy";
    if (target.closest("[data-cursor='scroll-up']")) return "scroll-up";

    const el = target;
    // Close / dismiss buttons
    const ariaLabel = el.getAttribute("aria-label") || "";
    if (ariaLabel.includes("Close") || ariaLabel.includes("Fechar") || el.closest("[data-state='open'] button")) {
      return "close";
    }
    // Scroll to top
    if (el.closest("[data-cursor='scroll-top']")) return "scroll-up";
    // Text inputs
    if (
      el.closest("input[type='text']") ||
      el.closest("input[type='email']") ||
      el.closest("input[type='search']") ||
      el.closest("textarea")
    ) {
      return "text";
    }
    // Icon buttons (nav icons, theme toggles, etc.)
    if (el.closest("button svg") && !el.closest("a")) return "icon";
    // Links with external reference
    if (el.closest("a[target='_blank']")) return "link";
    // Links
    if (el.closest("a")) return "link";
    // Buttons
    if (el.closest("button") || el.closest("[role='button']")) return "button";
    // Select elements
    if (el.closest("select")) return "button";
    // Tabindex
    if (el.closest("[tabindex]")) return "button";

    return "default";
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener("mousemove", updatePosition, { passive: true });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setCursorState(detectState(target));
    };

    const handleClick = (e: MouseEvent) => {
      setClicking(true);
      setTimeout(() => setClicking(false), 150);

      // Add ripple
      const id = Date.now();
      const newRipple = { id, x: e.clientX, y: e.clientY };
      ripplesRef.current = [...ripplesRef.current, newRipple];
      setRipples([...ripplesRef.current]);
      setTimeout(() => {
        ripplesRef.current = ripplesRef.current.filter((r) => r.id !== id);
        setRipples([...ripplesRef.current]);
      }, 600);
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [updatePosition, detectState, isTouch]);

  if (!mounted || isTouch) return null;

  const iconConfig = STATE_ICONS[cursorState];
  const isInteractive = cursorState !== "default";

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[10000] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid var(--color-accent-copper)",
          opacity: visible ? (isInteractive ? 0.5 : 0.25) : 0,
          transition: "opacity 0.2s ease",
        }}
        aria-hidden
      >
        {/* Icon inside ring */}
        <AnimatePresence mode="wait">
          {isInteractive && iconConfig && (
            <motion.div
              key={cursorState}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <iconConfig.Icon
                size={iconConfig.size}
                className="text-[var(--color-accent-copper)]"
                strokeWidth={2}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[10001] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "var(--color-accent-copper)",
          opacity: visible ? (clicking ? 0.3 : 0.9) : 0,
          scale: clicking ? 0.5 : 1,
        }}
        aria-hidden
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.4 }}
            animate={{ width: 50, height: 50, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9999] rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
              border: "1px solid var(--color-accent-copper)",
            }}
            aria-hidden
          />
        ))}
      </AnimatePresence>
    </>
  );
}
