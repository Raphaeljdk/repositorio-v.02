"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu, X, Github, Linkedin, Mail, ArrowUpRight,
  Home, User, FolderOpen, Briefcase, Wrench, MessageCircle,
  Layers, Award
} from "lucide-react";
import Image from "next/image";
import { navItems, moreNavItems, personal } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";
import { PillNav } from "./pill-nav";
import "./pill-nav.css";
import { cn } from "@/lib/utils";

const allNavItems = [...navItems, ...moreNavItems];

/* Icon mapping for mobile menu items */
const NAV_ICONS: Record<string, React.ReactNode> = {
  "#home": <Home className="h-4 w-4" />,
  "#about": <User className="h-4 w-4" />,
  "#projects": <FolderOpen className="h-4 w-4" />,
  "#experience": <Briefcase className="h-4 w-4" />,
  "#skills": <Wrench className="h-4 w-4" />,
  "#contact": <MessageCircle className="h-4 w-4" />,
  "#services": <Layers className="h-4 w-4" />,
  "#certifications": <Award className="h-4 w-4" />,
  "#github": <Github className="h-4 w-4" />,
};

/* Desktop PillNav items — exclude "Contato" (has CTA button) and "GitHub" (has social icon) */
const desktopNavItems = allNavItems.filter((item) => item.href !== "#contact" && item.href !== "#github");

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = allNavItems.map((n) => n.href.slice(1));
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
    el?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  };

  /* Mobile nav items — exclude "Contato" since there's a CTA button */
  const mobileNavItems = allNavItems.filter((item) => item.href !== "#contact");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "portfolio-nav flex items-center justify-between gap-4 rounded-xl px-3 sm:px-4 py-2.5 transition-all duration-300",
            scrolled
              ? "border border-[var(--surface-border)] bg-[var(--surface)]/95 backdrop-blur-md nav-scrolled-shadow nav-glow-border scrolled"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="group flex items-center gap-2.5 shrink-0"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-[var(--color-accent-copper)]/30 transition-all group-hover:ring-[var(--color-accent-copper)] group-hover:shadow-[0_0_12px_rgba(217,56,56,0.35)] sm:h-10 sm:w-10">
              <Image
                src="/raphael-logo.png"
                alt="Raphael Freitas — Logo"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                width={40}
                height={40}
                priority
                unoptimized
              />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground sm:block">
              {personal.firstName}
              <span className="text-[var(--color-accent-copper)]">.</span>
              {personal.lastName}
            </span>
          </a>

          {/* Desktop nav — PillNav (without Contato, which has its own CTA) */}
          <div className="hidden lg:flex">
            <PillNav
              items={desktopNavItems.map((item) => ({
                id: item.href,
                label: item.label,
                href: item.href,
              }))}
              activeId={active}
              onItemClick={(href) => go(href)}
            />
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="nav-availability hidden items-center gap-1.5 lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[var(--color-accent-sage)] pulse-smooth" />
                <span className="relative block h-2 w-2 rounded-full bg-[var(--color-accent-sage)]" />
              </span>
              <span className="font-code text-[11px] text-foreground/70">Disponível</span>
            </span>
            <div className="nav-socials hidden items-center gap-1.5 lg:flex">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--surface-border)] text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]"
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
              className="hidden items-center gap-1.5 rounded-lg bg-[var(--color-accent-copper)] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#EF4444] sm:inline-flex"
            >
              Contato
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--surface-border)] text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu — improved sidebar */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
              />
              {/* Sidebar panel */}
              <motion.div
                initial={{ opacity: 0, x: -16, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.8 }}
                id="mobile-navigation"
                className="fixed left-3 right-3 top-[68px] z-[61] max-h-[calc(100vh-84px)] overflow-y-auto overflow-x-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-2xl lg:hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-[var(--surface-border)] px-4 py-3">
                  <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-1 ring-[var(--color-accent-copper)]/30">
                    <Image
                      src="/raphael-logo.png"
                      alt="Raphael Freitas"
                      className="h-full w-full object-cover"
                      width={32}
                      height={32}
                      unoptimized
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground truncate">
                      {personal.firstName}<span className="text-[var(--color-accent-copper)]">.</span>{personal.lastName}
                    </p>
                    <p className="font-code text-[10px] text-muted-foreground truncate">
                      Desenvolvedor Full Stack
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-[var(--color-accent-sage)] pulse-smooth" />
                      <span className="relative block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-sage)]" />
                    </span>
                    <span className="font-code text-[9px] text-[var(--color-accent-sage)]">Disponível</span>
                  </span>
                </div>

                {/* Navigation items */}
                <div className="p-2">
                  {mobileNavItems.map((item) => {
                    const isActive = active === item.href;
                    const icon = NAV_ICONS[item.href];
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          go(item.href);
                        }}
                        className={cn(
                          "group flex items-center gap-3 min-h-[44px] rounded-xl px-3 py-2.5 text-sm transition-all duration-150",
                          isActive
                            ? "bg-[var(--color-accent-copper)]/12 text-foreground font-semibold border-l-[3px] border-[var(--color-accent-copper)]"
                            : "text-muted-foreground font-medium hover:bg-muted/60 hover:text-foreground border-l-[3px] border-transparent"
                        )}
                      >
                        <span className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                          isActive
                            ? "bg-[var(--color-accent-copper)]/15 text-[var(--color-accent-copper)]"
                            : "bg-muted/40 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                        )}>
                          {icon}
                        </span>
                        {item.label}
                      </a>
                    );
                  })}
                </div>

                {/* Social links */}
                <div className="border-t border-[var(--surface-border)] px-4 py-3">
                  <p className="font-code text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-2">
                    Conecte-se
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]/50"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]/50"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a
                      href={`mailto:${personal.email}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--surface-border)] py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-[var(--color-accent-copper)]/50"
                    >
                      <Mail className="h-3.5 w-3.5" /> E-mail
                    </a>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-4 pb-3">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      go("#contact");
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-copper)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EF4444] shadow-[0_2px_8px_rgba(217,56,56,0.25)]"
                  >
                    Fale comigo
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
