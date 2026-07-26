"use client";

import { useState, useCallback } from "react";
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
  Copy,
  Check,
  Clock,
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
      {/* Dot grid texture — 20% opacity */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Contato"
          title="Vamos construir algo grande."
          kanji={9}
          description="Aberto a oportunidades, freelance e colaborações."
        />

        {/* Response time indicator */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2.5"
          style={{ borderLeftColor: "var(--color-accent-copper)", borderLeftWidth: "3px" }}
        >
          <Clock className="h-3.5 w-3.5 text-[var(--color-accent-copper)]" />
          <span className="text-xs text-muted-foreground">
            Respondo em até <span className="font-semibold text-foreground">24h úteis</span>
          </span>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
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

            {/* Availability card — enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 rounded-xl bg-[var(--color-accent-copper)] p-6 text-white"
            >
              {/* Status line */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-white/80 animate-[ping_1.5s_ease-in-out_infinite]" />
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <p className="text-sm font-semibold">{personal.availability}</p>
              </div>

              {/* Location */}
              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                São Paulo · aberto a oportunidades remotas e presenciais.
              </p>

              {/* Work type badges */}
              <div className="mt-4">
                <p className="mono-label text-[10px] text-white/50 uppercase tracking-wider">Tipo</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {["Remoto", "Híbrido", "Presencial"].map((type) => (
                    <span
                      key={type}
                      className="inline-flex rounded-md bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred contact */}
              <p className="mt-4 text-xs text-white/70 leading-relaxed">
                Prefiro contato por <span className="text-white font-medium">e-mail</span> ou{" "}
                <span className="text-white font-medium">WhatsApp</span>.
              </p>

              {/* Action buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                <CopyEmailButton />
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/25"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/25"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
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
            {/* Subtle copper gradient overlay at top */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-xl"
              style={{
                background: "linear-gradient(180deg, rgba(220,38,38,0.04) 0%, transparent 100%)",
              }}
            />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex min-h-[400px] flex-col items-center justify-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-sage)]/10">
                  <CheckCircle2 className="h-8 w-8 text-[var(--color-accent-sage)]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Recebido!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Responderei em breve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-5">
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
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    maxLength={2000}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Conte um pouco sobre o projeto, prazos e objetivos..."
                    className="w-full resize-none rounded-lg border border-[var(--surface-border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.15)]"
                  />
                  <p className="mt-1 text-right font-code text-[10px] text-muted-foreground/50">
                    {form.message.length}/2000
                  </p>
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
                    "group inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed",
                    status === "loading"
                      ? "bg-[var(--color-accent-copper)] opacity-80"
                      : "bg-[var(--color-accent-copper)] hover:bg-[#EF4444] hover:shadow-[0_4px_24px_rgba(220,38,38,0.35)] active:scale-[0.99]"
                  )}
                >
                  {status === "loading" && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
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
                  Seus dados não são compartilhados com terceiros.
                </p>
              </form>
            )}
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
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
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
        className="w-full rounded-lg border border-[var(--surface-border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[var(--color-accent-copper)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.15)]"
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
    <div className="group flex min-h-[56px] items-center gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--color-accent-copper)] hover:-translate-y-[1px]">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-copper)]/10 text-[var(--color-accent-copper)] transition-colors group-hover:bg-[var(--color-accent-copper)]/20">
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

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      toast({ title: "E-mail copiado!", description: personal.email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  }, [toast]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/25"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          Copiar e-mail
        </>
      )}
    </button>
  );
}