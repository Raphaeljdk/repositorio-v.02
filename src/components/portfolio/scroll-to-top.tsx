"use client";

import { useSyncExternalStore, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function usePastScrollThreshold() {
  return useSyncExternalStore(
    useCallback((cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    }, []),
    () => window.scrollY > 600,
    () => false
  );
}

export function ScrollToTop() {
  const visible = usePastScrollThreshold();
  const reduce = useReducedMotion();

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          whileHover={reduce ? undefined : { scale: 1.1 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
          onClick={goTop}
          aria-label="Voltar ao topo"
          className="portfolio-scroll-top fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-foreground shadow-lg transition-colors hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
