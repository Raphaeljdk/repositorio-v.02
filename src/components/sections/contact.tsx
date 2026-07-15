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
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
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
        description: "Obrigado pelo contato. Responderei em breve.",
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

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Contato"
          title="Vamos construir algo grande."
          description="Aberto a oportunidades, freelance e colaborações. Respondo em até 24h."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="E-mail"
              value={personal.email}
              href={`mailto:${personal.email}`}
            />
            <ContactRow
              icon={<Phone className="h-4 w-4" />}
              label="Telefone"
              value={personal.phone}
              href={`https://wa.me/5511947374151`}
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Localização"
              value={personal.location}
            />
            <ContactRow
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
              value={`@${personal.githubHandle}`}
              href={personal.github}
            />
            <ContactRow
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value={personal.linkedinHandle}
              href={personal.linkedin}
            />

            {/* Availability card — solid accent color */}
            <div className="mt-4 rounded-xl bg-[var(--color-accent-copper)] p-6 text-white">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <p className="text-sm font-semibold">{personal.availability}</p>
              </div>
              <p className="mt-2 text-xs text-white/80">
                São Paulo · disponível para remoto ou híbrido.
              </p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/25"
              >
                <Calendar className="h-3.5 w-3.5" />
                Agendar uma conversa
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-surface rounded-xl p-6 sm:p-8"
            style={{ transform: "none" }}
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
                  className="mono-label mb-1.5 block"
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
                  className="w-full resize-none rounded-lg border border-[var(--surface-border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)]"
                />
              </div>

              {/* Honeypot */}
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
                  "group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed",
                  status === "success"
                    ? "bg-[var(--color-accent-sage)]"
                    : "bg-[var(--color-accent-copper)] hover:bg-[#E8886D] active:scale-[0.99]"
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
      <label htmlFor={id} className="mono-label mb-1.5 block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)]"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="group flex min-h-[52px] items-center gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--color-accent-copper)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent-copper)]/10 text-[var(--color-accent-copper)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mono-label">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
      {href && (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-[var(--color-accent-copper)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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