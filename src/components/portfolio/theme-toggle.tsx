"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Returns false during SSR, true once mounted on the client. */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  // Default to light (matches defaultTheme="light" in layout.tsx) during SSR
  // to avoid hydration mismatch. After mount, read resolvedTheme which works
  // correctly even when enableSystem=true.
  const isDark = mounted ? resolvedTheme === "dark" : false;
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      data-theme-toggle
      aria-label={`Ativar tema ${nextTheme}`}
      title={`Alternar para tema ${nextTheme === "dark" ? "escuro" : "claro"}`}
      onClick={() => setTheme(nextTheme)}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50"
    >
      <span className="sr-only">Alternar tema</span>
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <Moon className="h-4 w-4" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <Sun className="h-4 w-4" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <Sun className="h-4 w-4" strokeWidth={2} />
      )}
    </button>
  );
}