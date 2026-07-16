"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { navItems, personal } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navItems.map((n) => n.href.slice(1));
      const offset = window.innerHeight * 0.4;
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key to close mobile menu
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-[var(--color-accent-copper)]"
        style={{ scaleX }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border border-[var(--surface-border)] bg-[var(--surface)]/95 backdrop-blur-sm nav-scrolled-shadow"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo — RF box + name */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-accent-copper)] bg-[var(--color-accent-copper)]/10 font-display text-xs font-bold text-[var(--color-accent-copper)] transition-colors group-hover:bg-[var(--color-accent-copper)] group-hover:text-white">
              RF
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:block">
              {personal.firstName}
              <span className="text-[var(--color-accent-copper)]">.</span>
              {personal.lastName}
            </span>
          </a>

          {/* Desktop nav — underline style */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-px bg-[var(--color-accent-copper)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-[var(--color-accent-sage)] opacity-40 animate-[ping_1.5s_ease-in-out_infinite]" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--color-accent-sage)]" />
              </span>
              <span className="font-code text-[11px] text-foreground/70">Disponível para oportunidades</span>
            </span>
            <div className="hidden items-center gap-1 md:flex">
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
            </div>
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="hidden items-center gap-1.5 rounded-lg bg-[var(--color-accent-copper)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#EF4444] sm:inline-flex"
            >
              Contato
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="flex h-12 w-12 items-center justify-center rounded-md border border-[var(--surface-border)] text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop — full screen, blurred */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md lg:hidden"
              />
              {/* Menu panel — above backdrop and navbar */}
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="fixed left-4 right-4 top-[72px] z-[61] max-h-[calc(100vh-88px)] overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-2 shadow-2xl lg:hidden"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    className={cn(
                      "block min-h-[44px] rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      active === item.href
                        ? "bg-[var(--color-accent-copper)]/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-1 flex items-center gap-2 border-t border-[var(--surface-border)] px-2 pt-3">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-sm text-muted-foreground"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-sm text-muted-foreground"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-sm text-muted-foreground"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </div>
                <div className="mt-2 px-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      go("#contact");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent-copper)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EF4444]"
                  >
                    Contato
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}