"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { navItems, personal } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Active section detection
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

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass-strong shadow-premium"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-white shadow-glow-emerald">
              RF
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background" />
            </span>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight">
                {personal.firstName}
                <span className="text-gradient-emerald">.</span>
                {personal.lastName}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Full Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop nav */}
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
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground backdrop-blur-md transition-all hover:border-emerald-400/40 hover:text-foreground"
              >
                <Github className="h-[17px] w-[17px]" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground backdrop-blur-md transition-all hover:border-emerald-400/40 hover:text-foreground"
              >
                <Linkedin className="h-[17px] w-[17px]" />
              </a>
            </div>
            <ThemeToggle />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="hidden items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow-emerald transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
            >
              Vamos conversar
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur-md lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 overflow-hidden rounded-2xl glass-strong p-2 lg:hidden"
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
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active === item.href
                      ? "bg-emerald-400/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-1 flex items-center gap-2 border-t border-border/40 px-2 pt-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 py-2.5 text-sm"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 py-2.5 text-sm"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 py-2.5 text-sm"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
