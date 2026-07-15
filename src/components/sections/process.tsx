"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Code2, Rocket, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Entendimento",
    description: "Entendo o problema de negócio, os objetivos e o público-alvo. Defino escopo, tecnologias e roadmap.",
    icon: MessageSquare,
    color: "#D4775C",
  },
  {
    step: "02",
    title: "Design & Arquitetura",
    description: "Crio wireframes, design system e defino a arquitetura técnica — escalabilidade desde o início.",
    icon: Palette,
    color: "#E8B44D",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description: "Código limpo, testável e documentado. Commits semânticos, CI/CD e code review contínuo.",
    icon: Code2,
    color: "#5BB89A",
  },
  {
    step: "04",
    title: "Entrega & Evolução",
    description: "Deploy com observabilidade, monitoramento de erros e roadmap de evolução pós-lançamento.",
    icon: Rocket,
    color: "#7C8CF8",
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="mono-label">Processo</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Como eu trabalho.
          </h2>
          <div className="mt-3 h-px w-12 bg-[var(--color-accent-copper)]" />
          <p className="mt-3 text-sm text-muted-foreground sm:text-base leading-relaxed">
            Um processo estruturado que mantém previsibilidade sem sacrificar agilidade.
          </p>
        </motion.div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="mt-14">
          {/* Desktop: horizontal connected steps */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
            {STEPS.map((step, i) => (
              <ProcessStepDesktop key={step.step} step={step} index={i} isLast={i === STEPS.length - 1} />
            ))}
          </div>

          {/* Mobile: vertical cards */}
          <div className="space-y-4 lg:hidden">
            {STEPS.map((step, i) => (
              <ProcessStepMobile key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepDesktop({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] hidden lg:block">
          <div className="h-px w-full border-t border-dashed border-[var(--surface-border)]" />
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
            className="absolute top-1/2 -translate-y-1/2"
          >
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30" />
          </motion.div>
        </div>
      )}

      {/* Circle icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)]"
      >
        <Icon className="h-6 w-6" style={{ color: step.color }} />
        {/* Step number badge */}
        <span
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: step.color }}
        >
          {step.step}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
        className="mt-6 text-center px-2"
      >
        <h3 className="font-display text-base font-bold text-foreground">
          {step.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function ProcessStepMobile({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-surface flex items-start gap-4 rounded-xl p-5"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface)]"
      >
        <Icon className="h-5 w-5" style={{ color: step.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="font-code text-[10px] font-bold"
            style={{ color: step.color }}
          >
            STEP {step.step}
          </span>
        </div>
        <h3 className="mt-1 text-sm font-bold text-foreground">{step.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}