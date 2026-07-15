"use client";

import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight, Heart } from "lucide-react";
import { personal } from "@/lib/data";
import { motion } from "framer-motion";

const TECH_BADGES = [
  "Next.js 16",
  "TypeScript",
  "Tailwind CSS 4",
  "Framer Motion",
  "Lucide Icons",
];

export function Footer() {
  const year = new Date().getFullYear();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto bg-[var(--surface)]">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent-copper)]/40 to-transparent" />

      {/* Tech strip */}
      <div className="border-b border-[var(--surface-border)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6">
          <span className="shrink-0 font-code text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Feito com
          </span>
          <div className="flex items-center gap-2">
            {TECH_BADGES.map((tech, i) => (
              <span
                key={tech}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[var(--surface-border)] px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]/50"
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{
                    backgroundColor: ["#D4775C", "#5BB89A", "#E8B44D", "#7C8CF8", "#C47A5C"][i]
                  }}
                />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Top: Brand + Newsletter-style CTA */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <a
            href="#home"
            onClick={go("#home")}
            className="inline-flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-accent-copper)] bg-[var(--color-accent-copper)]/10 font-display text-[11px] font-bold text-[var(--color-accent-copper)]">
              RF
            </span>
            <div>
              <span className="font-display text-sm font-semibold text-foreground">
                {personal.firstName}
                <span className="text-[var(--color-accent-copper)]">.</span>
                {personal.lastName}
              </span>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </a>

          {/* Quick CTA */}
          <motion.a
            href="#contact"
            onClick={go("#contact")}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex items-center gap-2 rounded-xl border border-[var(--surface-border)] px-5 py-3 text-sm text-foreground transition-all hover:border-[var(--color-accent-copper)] hover:shadow-[0_4px_16px_rgba(212,119,92,0.15)]"
          >
            <span>Vamos trabalhar juntos?</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--color-accent-copper)]" />
          </motion.a>
        </div>

        {/* Middle: Social links */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(212,119,92,0.1)] sm:h-9 sm:w-9"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(212,119,92,0.1)] sm:h-9 sm:w-9"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(212,119,92,0.1)] sm:h-9 sm:w-9"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Bottom: copyright + shortcuts hint + back to top */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-6 sm:flex-row">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              © {year} {personal.fullName}
              <span className="inline-block h-1 w-1 rounded-full bg-[var(--color-accent-copper)]/60" />
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground/40">
              Feito com <Heart className="h-3 w-3 text-[var(--color-accent-copper)]/60" /> em São Paulo
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground/50 sm:inline-flex">
              <kbd className="inline-flex h-4 min-w-[16px] items-center justify-center rounded border border-[var(--surface-border)] bg-muted/50 px-1 font-code text-[9px]">?</kbd>
              <span>atalhos</span>
            </span>
            <a
              href="#home"
              onClick={go("#home")}
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--surface-border)] px-4 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)]"
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
      </div>
    </footer>
  );
}