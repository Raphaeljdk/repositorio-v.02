"use client";

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Trash2, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SESSION_ID = typeof crypto !== "undefined"
  ? crypto.randomUUID?.() ?? `session-${Date.now()}`
  : `session-${Date.now()}`;

const SUGGESTED_QUESTIONS = [
  "Quais são as principais habilidades do Raphael?",
  "Me conte sobre a experiência dele na Polyexcel.",
  "Quais projetos ele já construiu?",
  "Ele está disponível para oportunidades?",
];

export function AIChatWidget() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-slot=scroll-area-viewport]"
      ) as HTMLElement | null;
      viewport?.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: SESSION_ID }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erro desconhecido.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err instanceof Error
              ? err.message
              : "Desculpe, ocorreu um erro. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleClear = async () => {
    try {
      await fetch(`/api/chat?sessionId=${SESSION_ID}`, { method: "DELETE" });
    } catch {
      /* ignore */
    }
    setMessages([]);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[80] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 mb-2 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] shadow-sumi-lg sm:w-[380px]"
            style={{ maxHeight: "min(560px, calc(100vh - 120px))" }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--surface-border)] px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-copper)]/10">
                <Bot className="h-[18px] w-[18px] text-[var(--color-accent-copper)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Raphael AI
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Pergunte sobre mim &bull; CV &amp; Projetos
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Limpar conversa"
                  title="Limpar conversa"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Fechar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-3 px-4 py-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 py-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-copper)]/8">
                        <Bot className="h-7 w-7 text-[var(--color-accent-copper)]" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">
                          Olá! Sou o Raphael AI
                        </p>
                        <p className="mt-1 max-w-[260px] text-xs text-muted-foreground">
                          Posso responder perguntas corporativas sobre o
                          Raphael com base no currículo e projetos dele.
                        </p>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => handleSuggestion(q)}
                            className="w-full rounded-xl border border-[var(--surface-border)] px-3.5 py-2.5 text-left text-xs text-muted-foreground transition-all hover:border-[var(--color-accent-copper)]/40 hover:text-foreground hover:bg-[var(--color-accent-copper)]/4"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex gap-2.5",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msg.role === "assistant" && (
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-copper)]/10">
                            <Bot className="h-3.5 w-3.5 text-[var(--color-accent-copper)]" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                            msg.role === "user"
                              ? "rounded-br-md bg-[var(--color-accent-copper)] text-white"
                              : "rounded-bl-md bg-muted text-foreground"
                          )}
                        >
                          {msg.content}
                        </div>
                        {msg.role === "user" && (
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                            <User className="h-3.5 w-3.5 text-foreground/60" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="flex gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-copper)]/10">
                        <Bot className="h-3.5 w-3.5 text-[var(--color-accent-copper)]" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Pensando...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--surface-border)] p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Faça uma pergunta sobre o Raphael..."
                  disabled={loading}
                  maxLength={500}
                  className="flex-1 rounded-xl border border-[var(--surface-border)] bg-[var(--background)] px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-[var(--color-accent-copper)] focus:shadow-[0_0_0_2px_rgba(220,38,38,0.12)] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all",
                    input.trim() && !loading
                      ? "bg-[var(--color-accent-copper)] text-white hover:bg-[#EF4444] active:scale-[0.96]"
                      : "bg-muted text-muted-foreground"
                  )}
                  aria-label="Enviar mensagem"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/40">
                IA baseada no currículo e projetos de Raphael
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full shadow-sumi-lg transition-colors",
          open
            ? "bg-foreground text-background"
            : "bg-[var(--color-accent-copper)] text-white hover:bg-[#EF4444]"
        )}
        aria-label={open ? "Fechar chat" : "Abrir chat com IA"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-[var(--color-accent-copper)] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[var(--color-accent-copper)]" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
