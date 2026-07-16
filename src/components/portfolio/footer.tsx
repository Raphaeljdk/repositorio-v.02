"use client";

import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight, Send } from "lucide-react";
import { personal, navItems } from "@/lib/data";
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

  // Only show a subset of nav items in footer (skip "Início")
  const footerNav = navItems.filter((n) => n.label !== "Início");

  return (
    <footer className="relative mt-auto bg-[var(--surface)]">
      {/* Gradient top border — thicker, more prominent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-accent-copper)]/40 to-transparent" />

      {/* Top CTA band — full width copper accent */}
      <div className="border-b border-[var(--surface-border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-8 sm:px-6">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Vamos construir algo{" "}
              <span className="text-[var(--color-accent-copper)]">incrível</span> juntos?
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-md">
              Estou disponível para oportunidades, projetos freelance e colaborações open source.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={go("#contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[var(--color-accent-copper)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(220,38,38,0.25)] transition-all hover:shadow-[0_6px_28px_rgba(220,38,38,0.35)] hover:bg-[#EF4444]"
            >
              <Send className="h-4 w-4" />
              Entrar em contato
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Column 1: Brand + bio */}
          <div>
            <a
              href="#home"
              onClick={go("#home")}
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[var(--color-accent-copper)] bg-[var(--color-accent-copper)]/10 font-display text-sm font-bold text-[var(--color-accent-copper)]">
                RF
              </span>
              <div>
                <span className="font-display text-base font-bold text-foreground">
                  {personal.firstName}
                  <span className="text-[var(--color-accent-copper)]">.</span>
                  {personal.lastName}
                </span>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Full Stack Developer &amp; SAP Specialist
                </p>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {personal.bio}
            </p>
            {/* Social links */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(220,38,38,0.1)]"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(220,38,38,0.1)]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-muted-foreground transition-all hover:text-foreground hover:border-[var(--color-accent-copper)] hover:shadow-[0_2px_8px_rgba(220,38,38,0.1)]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="mono-label mb-4">Navegação</p>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={go(item.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:text-[var(--color-accent-copper)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Tech stack */}
          <div>
            <p className="mono-label mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((tech, i) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] px-2.5 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]/50"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: ["#DC2626", "#10B981", "#F97316", "#7C8CF8", "#B91C1C"][i],
                    }}
                  />
                  {tech}
                </span>
              ))}
            </div>

            {/* Keyboard shortcut hint */}
            <div className="mt-6 hidden items-center gap-1.5 text-xs text-muted-foreground/50 sm:inline-flex">
              <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[var(--surface-border)] bg-muted/50 px-1.5 font-code text-[10px]">
                ?
              </kbd>
              <span>atalhos de teclado</span>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + back to top */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-6 sm:flex-row">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>© {year} {personal.fullName}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--color-accent-copper)]/40" />
            <span className="text-muted-foreground/50">Feito com dedicação em São Paulo</span>
          </div>

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
    </footer>
  );
}