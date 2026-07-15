"use client";

import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { personal, navItems } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto border-t border-border/40 bg-background/40 backdrop-blur-xl">
      {/* Top glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" onClick={go("#home")} className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-white shadow-glow-emerald">
                RF
              </span>
              <span className="font-display text-sm font-semibold">
                {personal.firstName}
                <span className="text-gradient-emerald">.</span>
                {personal.lastName}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {personal.title} baseado em {personal.location}. Construindo produtos que escalam
              e encantam.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-emerald-400/40 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-emerald-400/40 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-emerald-400/40 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
              Contato
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${personal.email}`} className="transition-colors hover:text-emerald-400">
                  {personal.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/5511947374151`} target="_blank" rel="noreferrer" className="transition-colors hover:text-emerald-400">
                  {personal.phone}
                </a>
              </li>
              <li>{personal.location}</li>
              <li>
                <a
                  href={personal.website}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-emerald-400"
                >
                  Portfólio online ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {personal.fullName}. Construído com{" "}
            <Heart className="inline h-3 w-3 fill-rose-400 text-rose-400" /> usando Next.js ·
            TypeScript · Tailwind.
          </p>
          <a
            href="#home"
            onClick={go("#home")}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all hover:border-emerald-400/40 hover:text-foreground"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}
