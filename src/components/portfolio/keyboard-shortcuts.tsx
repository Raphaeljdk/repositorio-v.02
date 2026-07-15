"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHORTCUTS = [
  { keys: ["?"], description: "Abrir este painel" },
  { keys: ["/"], description: "Buscar tecnologias" },
  { keys: ["Esc"], description: "Fechar modal / painel" },
  { keys: ["t"], description: "Alternar tema claro/escuro" },
  { keys: ["h"], description: "Ir para o início" },
  { keys: ["p"], description: "Ir para projetos" },
  { keys: ["c"], description: "Ir para contato" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger in inputs/textareas
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      // Don't trigger when modal is open (except Escape)
      if (document.body.style.overflow === "hidden" && e.key !== "Escape") return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "t" && !open) {
        e.preventDefault();
        // Find and click the theme toggle
        const themeBtn = document.querySelector("[data-theme-toggle]");
        (themeBtn as HTMLElement)?.click();
      } else if (e.key === "h" && !open) {
        e.preventDefault();
        document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "p" && !open) {
        e.preventDefault();
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "c" && !open) {
        e.preventDefault();
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[61] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Atalhos de teclado
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Navegue mais rápido pelo portfólio
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-1">
              {SHORTCUTS.map((s, i) => (
                <motion.div
                  key={s.description}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                >
                  <span className="text-sm text-foreground/80">{s.description}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((key) => (
                      <kbd
                        key={key}
                        className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-[var(--surface-border)] bg-muted/50 px-1.5 font-code text-[11px] text-muted-foreground"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-center font-code text-[10px] text-muted-foreground/50">
              Pressione <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-[var(--surface-border)] bg-muted/50 px-1 font-code text-[9px]">?</kbd> para abrir/fechar
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}