"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, Building2, Sparkles, Cloud, ArrowUpRight, BrainCircuit } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "./about";

const ICONS = { code: Code2, building: Building2, sparkles: Sparkles, cloud: Cloud };

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label="Serviços" title="Como posso ajudar." kanji={2}
          description="Desenvolvimento, automação e interfaces pensadas para a rotina do seu negócio." />
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Code2;
            return (
              <motion.article key={service.title} className="service-card"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : index * 0.05 }}>
                <div className="service-card-top">
                  <span className="service-icon"><Icon size={23} aria-hidden="true" /></span>
                  <span className="service-index" aria-hidden="true">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
                <a href="#contact" className="service-link"
                  aria-label={`Conversar sobre ${service.title}`}>
                  Conversar sobre este serviço <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>
        <div className="services-note">
          <BrainCircuit size={20} aria-hidden="true" />
          <p>Inteligência artificial no processo. <strong>Intenção em cada entrega.</strong>
            <span>ChatGPT, DeepSeek, GLM e Gemini como ferramentas de desenvolvimento.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
