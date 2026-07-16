"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Clock, RefreshCw } from "lucide-react";
import { SectionHeading } from "./about";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date: string;
}

export function TechNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/news?_t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: NewsItem[] = await res.json();
      setNews(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section id="news" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Subtle accent corner */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-40 w-40 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, var(--color-accent-copper), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Blog"
          title="Notícias & Tendências"
          description="Últimas notícias do mundo da tecnologia, atualizadas em tempo real."
        />

        {/* Loading state */}
        {loading && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] p-5"
              >
                <div className="h-0.5 w-full bg-[var(--color-accent-copper)] mb-4" />
                <Skeleton className="mb-3 h-5 w-4/5" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="mb-4 h-3 w-2/3" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] p-12"
          >
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar as notícias.
            </p>
            <button
              type="button"
              onClick={fetchNews}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[var(--color-accent-copper)] hover:text-[var(--color-accent-copper)]"
            >
              <RefreshCw className="h-4 w-4" />
              Tentar novamente
            </button>
          </motion.div>
        )}

        {/* News grid */}
        {!loading && !error && news.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <NewsCard key={item.url} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && news.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] p-12">
            <p className="text-sm text-muted-foreground">
              Nenhuma notícia encontrada no momento.
            </p>
          </div>
        )}

        {/* Footer note */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          >
            <Clock className="h-3.5 w-3.5" />
            Atualizado automaticamente via web search
          </motion.p>
        )}
      </div>
    </section>
  );
}

function NewsCard({
  item,
  index,
}: {
  item: NewsItem;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] transition-[border-color] duration-300 hover:border-[var(--color-accent-copper)]"
    >
      {/* Red accent top line */}
      <div className="h-0.5 w-full bg-[var(--color-accent-copper)]" />

      <div className="flex flex-1 flex-col p-5">
        {/* Title — clickable */}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-start justify-between gap-2"
        >
          <h3 className="font-display text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-[var(--color-accent-copper)] line-clamp-2">
            {item.title}
          </h3>
          <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[var(--color-accent-copper)]" />
        </a>

        {/* Snippet */}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.snippet}
        </p>

        {/* Source */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--surface-border)]">
          <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
            {item.source}
          </span>
          {item.date && (
            <span className="text-[10px] text-muted-foreground">
              {item.date}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}