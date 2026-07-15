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
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  // Avoid hydration mismatch: render a stable label/icon until mounted,
  // then switch to the theme-aware values on the client.
  const isDark = mounted ? theme === "dark" : true;
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Ativar tema ${nextTheme}`}
      onClick={() => setTheme(nextTheme)}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md transition-all hover:border-emerald-400/40 hover:shadow-glow-emerald"
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
              className="text-emerald-300"
            >
              <Moon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="text-amber-500"
            >
              <Sun className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <Moon className="h-[18px] w-[18px] text-emerald-300" strokeWidth={2.2} />
      )}
    </button>
  );
}
