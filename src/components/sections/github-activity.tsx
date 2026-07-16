"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, RefreshCw } from "lucide-react";
import { SectionHeading } from "./about";
import { MagneticButton } from "@/components/portfolio/magnetic-button";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────── */

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

/* ── Language color map ──────────────────────────────────────────── */

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  React: "#61dafb",
  Vue: "#41b883",
  Node: "#339933",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

/* ── Relative time helper (Portuguese) ───────────────────────────── */

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;
  if (diffHr < 24) return `há ${diffHr}h`;
  if (diffDay < 7) return `há ${diffDay} dia${diffDay > 1 ? "s" : ""}`;
  if (diffWeek < 5) return `há ${diffWeek} semana${diffWeek > 1 ? "s" : ""}`;
  if (diffMonth < 12) return `há ${diffMonth} mês${diffMonth > 1 ? "es" : ""}`;
  return `há ${diffYear} ano${diffYear > 1 ? "s" : ""}`;
}

/* ── Skeleton loader ─────────────────────────────────────────────── */

function SkeletonGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Carregando repositórios">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="card-surface card-glow animate-pulse rounded-xl p-5"
          aria-hidden="true"
        >
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="mt-3 h-3 w-full rounded bg-muted" />
          <div className="mt-2 h-3 w-3/4 rounded bg-muted" />
          <div className="mt-5 flex gap-3">
            <div className="h-3 w-14 rounded bg-muted" />
            <div className="h-3 w-14 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Repo card ───────────────────────────────────────────────────── */

function RepoCard({
  repo,
  index,
}: {
  repo: GitHubRepo;
  index: number;
}) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "var(--color-accent-copper)") : null;

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group card-surface card-glow flex flex-col rounded-xl p-5 transition-[border-color,transform] duration-300",
        "hover:border-[var(--color-accent-copper)]/30 hover:-translate-y-[1px]",
      )}
      aria-label={`Repositório ${repo.name} no GitHub`}
    >
      {/* Repo name */}
      <h3 className="font-display text-base font-bold tracking-tight text-foreground group-hover:text-[var(--color-accent-copper)] transition-colors line-clamp-1">
        {repo.name}
      </h3>

      {/* Description */}
      {repo.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>
      )}

      {/* Topics pills */}
      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-[var(--surface-border)] bg-muted/40 px-2.5 py-0.5 font-code text-[10px] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground border-t border-[var(--surface-border)]">
        {/* Language */}
        {langColor && repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            <span>{repo.language}</span>
          </span>
        )}

        {/* Stars */}
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{repo.stargazers_count}</span>
          </span>
        )}

        {/* Forks */}
        {repo.forks_count > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{repo.forks_count}</span>
          </span>
        )}

        {/* Updated ago */}
        <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
      </div>
    </motion.a>
  );
}

/* ── Main component ──────────────────────────────────────────────── */

export function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github?_t=${Date.now()}`);
      const data: GitHubRepo[] = await res.json();
      setRepos(data);
      setLastUpdated(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section id="github" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="GitHub"
          title="Código aberto."
          description="Repositórios atualizados em tempo real do GitHub."
        />

        {lastUpdated && (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={fetchRepos}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--surface-border)] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-[var(--color-accent-copper)] hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Atualizar
            </button>
            <span className="font-code text-[10px] text-muted-foreground/60">
              Atualizado as {lastUpdated}
            </span>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : repos.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {repos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Nenhum repositório encontrado.
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <MagneticButton
            as="a"
            href="https://github.com/Raphaeljdk"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-[var(--surface-border)] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[var(--color-accent-copper)]"
          >
            Ver perfil no GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}