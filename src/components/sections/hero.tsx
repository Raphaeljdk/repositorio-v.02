"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { personal } from "@/lib/data";
import { HankoSeal } from "@/components/portfolio/signature";

const ease = [0.22, 1, 0.36, 1] as const;
const entrance = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const ROLES = [
  "Desenvolvedor Full Stack",
  "Eng. de Software",
  "Arquiteto de Sistemas",
  "Automação & IA",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length === word.length) {
          setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, pause]);

  return text;
}

export function Hero() {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 130, damping: 22 });
  const trackPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };
  const go = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });

  const typedRole = useTypewriter(ROLES);

  return (
    <section id="home" className="hero-editorial">
      <div className="hero-paper-grid" aria-hidden />
      <div className="hero-sun-wash" aria-hidden />
      <div className="hero-gradient-orb" aria-hidden />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden>
        <div className="hero-particle" style={{ left: "15%", bottom: "0", animationDuration: "12s", animationDelay: "0s" }} />
        <div className="hero-particle" style={{ left: "35%", bottom: "0", animationDuration: "15s", animationDelay: "2s" }} />
        <div className="hero-particle" style={{ left: "55%", bottom: "0", animationDuration: "10s", animationDelay: "4s" }} />
        <div className="hero-particle" style={{ left: "72%", bottom: "0", animationDuration: "14s", animationDelay: "1s" }} />
        <div className="hero-particle" style={{ left: "88%", bottom: "0", animationDuration: "11s", animationDelay: "3s" }} />
        <div className="hero-particle" style={{ left: "25%", bottom: "0", animationDuration: "16s", animationDelay: "5s" }} />
        <div className="hero-particle" style={{ left: "48%", bottom: "0", animationDuration: "13s", animationDelay: "6s" }} />
        <div className="hero-particle" style={{ left: "65%", bottom: "0", animationDuration: "17s", animationDelay: "7s" }} />
      </div>

      <span className="hero-kanji" aria-hidden>道</span>

      <div className="hero-composition">
        <motion.div
          className="hero-copy"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
        >
          <motion.div variants={entrance} className="hero-eyebrow">
            <span className="hero-index">01 / PORTFÓLIO</span>
            <span className="hero-eyebrow-rule" />
            <span>{personal.location} · 2026</span>
          </motion.div>

          <motion.div variants={entrance} className="hero-title-wrap">
            <h1 className="hero-title">
              <span>Raphael</span>
              <span className="hero-surname">Freitas<span className="hero-title-dot">.</span></span>
            </h1>
            <HankoSeal size={60} animated className="hero-seal" />
          </motion.div>

          <motion.p variants={entrance} className="hero-role">
            {reduce ? (
              <>Desenvolvedor Full Stack <span>/</span> Eng. de Software</>
            ) : (
              <>{typedRole}<span className="hero-type-cursor">|</span> <span>/</span> Eng. de Software</>
            )}
          </motion.p>
          <motion.p variants={entrance} className="hero-description">
            Construindo produtos que resolvem problemas reais.
            <br className="hidden sm:block" /> Da arquitetura ao deploy, <em>com intenção.</em>
          </motion.p>

          <motion.div variants={entrance} className="hero-actions">
            <a href="#projects" onClick={e => { e.preventDefault(); go("#projects"); }} className="hero-button hero-button-primary">
              Explorar projetos <ArrowUpRight size={17} />
            </a>
            <a href="/curriculo-raphael-freitas.pdf" download className="hero-button hero-button-secondary">
              <Download size={16} /> Currículo
            </a>
          </motion.div>

          <motion.div variants={entrance} className="hero-availability">
            <span className="hero-status-dot" /> Disponível para projetos
            <span className="hero-availability-divider" /> Automação com Python
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-art"
          onPointerMove={trackPointer}
          onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
        >
          <span className="hero-art-coordinate" aria-hidden>学びの道 — THE PATH OF LEARNING</span>
          <motion.div className="hero-art-disc" style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}>
            <div className="hero-orbit hero-orbit-outer" aria-hidden />
            <div className="hero-orbit hero-orbit-inner" aria-hidden />
            <svg className="hero-enso" viewBox="0 0 400 400" fill="none" aria-hidden>
              <motion.circle cx="200" cy="200" r="194" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 0.82, opacity: 0.5 }}
                transition={{ duration: 2.3, delay: 0.6, ease }} />
            </svg>
            <div className="hero-logo-frame">
              <Image src="/raphael-logo.png" alt="Raphael Freitas — dragão, bonsai e cerejeira" width={500} height={500} priority unoptimized className="hero-logo" />
            </div>
            <span className="hero-orbit-label" aria-hidden>継続は力なり</span>
          </motion.div>
          <div className="hero-art-caption"><span>ENGENHARIA × CRIATIVIDADE</span><span className="hero-caption-rule" /><span>RF — 2026</span></div>
        </motion.div>
      </div>

      <motion.div className="hero-bottom" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.7 }}>
        <div className="hero-stack"><span className="hero-stack-label">STACK PRINCIPAL</span><span>React</span><i /><span>Next.js</span><i /><span>TypeScript</span><i /><span>Python</span></div>
        <a href="#about" onClick={e => { e.preventDefault(); go("#about"); }} className="hero-scroll">Conheça meu trabalho <ArrowDown size={14} /></a>
      </motion.div>
    </section>
  );
}
