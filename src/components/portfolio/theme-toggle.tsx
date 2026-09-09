"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Returns false during SSR, true once mounted on the client. */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Premium theme toggle with cross-fade transition.
 *
 * - Uses View Transitions API when available (Chrome 111+, Edge 111+)
 *   for a smooth circular reveal from the toggle button
 * - Falls back to a CSS-driven opacity fade on other browsers
 * - Respects `prefers-reduced-motion` — instant switch, no animation
 * - Fully responsive: 44px touch target on mobile, 36px on desktop
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const nextTheme = isDark ? "light" : "dark";

  const handleToggle = useCallback(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // View Transitions API — circular reveal from button position
    if (!reducedMotion && typeof document !== "undefined" && "startViewTransition" in document) {
      const button = buttonRef.current;
      const x = button
        ? button.getBoundingClientRect().left + button.getBoundingClientRect().width / 2
        : window.innerWidth / 2;
      const y = button
        ? button.getBoundingClientRect().top + button.getBoundingClientRect().height / 2
        : window.innerHeight / 2;

      // Calculate radius to cover entire viewport from the button position
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Apply the clip-path animation via CSS custom properties
      document.documentElement.style.setProperty("--transition-x", `${x}px`);
      document.documentElement.style.setProperty("--transition-y", `${y}px`);
      document.documentElement.style.setProperty("--transition-radius", `${maxRadius}px`);

      (document as unknown as { startViewTransition: (cb: () => void) => { finished: Promise<void> } }).startViewTransition(() => {
        setTheme(nextTheme);
      });
      return;
    }

    // Fallback: CSS opacity fade via class toggle
    if (!reducedMotion) {
      document.documentElement.classList.add("theme-transitioning");
      // Small delay to let the CSS transition start
      requestAnimationFrame(() => {
        setTheme(nextTheme);
        // Remove the class after the transition completes
        const onEnd = () => {
          document.documentElement.classList.remove("theme-transitioning");
          document.documentElement.removeEventListener("transitionend", onEnd);
        };
        document.documentElement.addEventListener("transitionend", onEnd);
        // Safety timeout in case transitionend doesn't fire
        setTimeout(() => {
          document.documentElement.classList.remove("theme-transitioning");
        }, 500);
      });
      return;
    }

    // Reduced motion — instant switch
    setTheme(nextTheme);
  }, [nextTheme, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      data-theme-toggle
      aria-label={`Ativar tema ${nextTheme}`}
      title={`Alternar para tema ${nextTheme === "dark" ? "escuro" : "claro"}`}
      onClick={handleToggle}
      className="theme-toggle-btn relative flex items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-[var(--color-accent-copper)] hover:bg-muted/50 active:scale-[0.92] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-copper)] min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px]"
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
              className="flex items-center justify-center"
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
              className="flex items-center justify-center"
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
