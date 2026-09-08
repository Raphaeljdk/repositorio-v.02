"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PillNavItem {
  id: string;
  label: string;
  href: string;
}

interface PillNavProps {
  items: PillNavItem[];
  activeId: string;
  onItemClick?: (href: string) => void;
  className?: string;
}

/**
 * PillNav — SHOGUN DIGITAL
 * A pill-shaped navigation with a smooth sliding indicator.
 * Uses framer-motion instead of GSAP for Next.js compatibility.
 * The pill indicator animates position and width to follow the active item.
 */
export function PillNav({ items, activeId, onItemClick, className = "" }: PillNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const updatePill = useCallback(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-nav-id="${activeId}"]`) as HTMLElement;
    if (!activeEl) return;
    const navRect = navRef.current.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    setPillStyle({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
    });
  }, [activeId]);

  useEffect(() => {
    updatePill();
  }, [updatePill]);

  // Update on resize
  useEffect(() => {
    if (!navRef.current) return;
    const observer = new ResizeObserver(updatePill);
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [updatePill]);

  return (
    <div
      ref={navRef}
      className={`pill-nav ${className}`}
      role="navigation"
      aria-label="Section navigation"
    >
      {/* Sliding pill indicator */}
      <motion.div
        className="pill-nav-indicator"
        layout
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
          mass: 0.8,
        }}
        style={{
          position: "absolute",
          left: pillStyle.left,
          width: pillStyle.width,
          height: "100%",
          top: 0,
        }}
      />

      {/* Nav items */}
      {items.map((item) => (
        <a
          key={item.id}
          data-nav-id={item.id}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            onItemClick?.(item.href);
          }}
          className={`pill-nav-item ${activeId === item.id ? "active" : ""}`}
          aria-current={activeId === item.id ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default PillNav;
