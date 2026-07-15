"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personal } from "@/lib/data";
import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto bg-[var(--surface)]">
      {/* Gradient top border instead of solid */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent-copper)]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Row 1: brand + socials */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <a
            href="#home"
            onClick={go("#home")}
            className="inline-flex items-center gap-2.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-accent-copper)] bg-[var(--color-accent-copper)]/10 font-display text-[10px] font-bold text-[var(--color-accent-copper)]">
              RF
            </span>
            <span className="font-display text-sm font-semibold text-foreground">
              {personal.firstName}
              <span className="text-[var(--color-accent-copper)]">.</span>
              {personal.lastName}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)] sm:h-8 sm:w-8"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)] sm:h-8 sm:w-8"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)] sm:h-8 sm:w-8"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Row 2: copyright + tech + back to top */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[var(--surface-border)] pt-5 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {personal.fullName}
            <span className="mx-1.5 inline-block h-1 w-1 rounded-full bg-[var(--color-accent-copper)]/60" />
            Built with Next.js, TypeScript & Tailwind
          </p>
          <a
            href="#home"
            onClick={go("#home")}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--surface-border)] px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]"
          >
            <motion.span
              whileHover={{ rotate: -45 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-flex"
            >
              <ArrowUp className="h-3 w-3" />
            </motion.span>
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}