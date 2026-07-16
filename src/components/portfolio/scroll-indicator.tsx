"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ScrollIndicator() {
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
      const sections = navItems.map((n) => n.href.slice(1));
      const offset = window.innerHeight * 0.35;
      let current = "#home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            current = `#${id}`;
            break;
          }
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.3 }}
          aria-label="Navegação por seções"
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-1"
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            const isHovered = hovered === item.href;
            return (
              <div
                key={item.href}
                className="group/indicator relative flex items-center justify-end"
                onMouseEnter={() => setHovered(item.href)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Label — appears on hover */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "mr-3 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium shadow-sm",
                        "border border-[var(--surface-border)] bg-[var(--surface)]",
                        isActive
                          ? "text-[var(--color-accent-copper)]"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  aria-label={item.label}
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300",
                    isActive
                      ? "h-3 w-3 bg-[var(--color-accent-copper)] shadow-[0_0_8px_rgba(220,38,38,0.4)]"
                      : "h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                />
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}