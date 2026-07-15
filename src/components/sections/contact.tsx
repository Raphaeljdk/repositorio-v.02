"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { personal } from "@/lib/data";
import { SectionHeading } from "./about";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message ?? "Falha no envio");
      }
      setStatus("success");
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve. 🚀",
      });
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      toast({
        title: "Erro ao enviar",
        description: err instanceof Error ? err.message : "Tente novamente.",
        variant: "destructive",
      });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="07 / Contato"
          title="Vamos construir algo grande."
          description="Aberto a oportunidades, freelance e colaborações em projetos desafiadores. Respondo em até 24h."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <ContactRow
              icon={<Mail className="h-5 w-5" />}
              label="E-mail"
              value={personal.email}
              href={`mailto:${personal.email}`}
              accent="from-emerald-500 to-teal-500"
            />
            <ContactRow
              icon={<Phone className="h-5 w-5" />}
              label="Telefone / WhatsApp"
              value={personal.phone}
              href={`https://wa.me/5511947374151`}
              accent="from-amber-500 to-orange-500"
            />
            <ContactRow
              icon={<MapPin className="h-5 w-5" />}
              label="Localização"
              value={personal.location}
              accent="from-violet-500 to-fuchsia-500"
            />
            <ContactRow
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              value={`@${personal.githubHandle}`}
              href={personal.github}
              accent="from-cyan-500 to-sky-500"
            />
            <ContactRow
              icon={<Linkedin className="h-5 w-5" />}
              label="LinkedIn"
              value={personal.linkedinHandle}
              href={personal.linkedin}
              accent="from-teal-500 to-emerald-500"
            />

            {/* Availability card */}
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white shadow-glow-emerald">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <p className="text-sm font-semibold">{personal.availability}</p>
              </div>
              <p className="mt-2 text-xs text-white/80">
                Atualmente em São Paulo · disponível para remoto ou híbrido.
              </p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur-md transition-colors hover:bg-white/25"
              >
                <Calendar className="h-3.5 w-3.5" />
                Agendar uma conversa
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Nome"
                  id="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Seu nome"
                  required
                />
                <Field
                  label="E-mail"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="voce@exemplo.com"
                  required
                />
              </div>
              <Field
                label="Assunto"
                id="subject"
                value={form.subject}
                onChange={update("subject")}
                placeholder="Sobre o que vamos conversar?"
                required
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Conte um pouco sobre o projeto, prazos e objetivos..."
                  className="w-full resize-none rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm backdrop-blur-md outline-none transition-all placeholder:text-muted-foreground/60 focus:border-emerald-400/50 focus:shadow-glow-emerald"
                />
              </div>

              {/* Honeypot (hidden from users) */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={update("company")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={cn(
                  "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed",
                  status === "success"
                    ? "bg-emerald-500"
                    : "bg-brand-gradient shadow-glow-emerald hover:scale-[1.01] active:scale-[0.99]"
                )}
              >
                {status === "loading" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Mensagem enviada!
                  </>
                )}
                {(status === "idle" || status === "error") && (
                  <>
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                    Enviar mensagem
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-muted-foreground">
                Seus dados não são compartilhados. Resposta em até 24h úteis.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border/60 bg-background/40 px-4 py-3 text-sm backdrop-blur-md outline-none transition-all placeholder:text-muted-foreground/60 focus:border-emerald-400/50 focus:shadow-glow-emerald"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: string;
}) {
  const Inner = (
    <div className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:shadow-premium">
      <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white", accent)}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {Inner}
    </a>
  ) : (
    Inner
  );
}
