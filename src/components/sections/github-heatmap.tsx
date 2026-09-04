"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Generate deterministic contribution data                           */
/* ------------------------------------------------------------------ */
function generateContributions(): number[] {
  // 52 weeks × 7 days = 364 cells
  const cells: number[] = [];
  const seed = [3, 7, 2, 8, 1, 5, 9, 4, 6, 0, 2, 8, 3, 1, 7, 5, 9, 2, 6, 4];
  let idx = 0;

  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      const v = seed[idx % seed.length];
      idx++;

      // Simulate realistic patterns: more active on weekdays, occasional bursts
      const isWeekday = d >= 1 && d <= 5;
      const burstWeek = (w >= 12 && w <= 16) || (w >= 30 && w <= 34);
      const quietWeek = w >= 20 && w <= 24;

      let level = 0;
      if (burstWeek && isWeekday && v > 2) level = Math.min(4, v);
      else if (quietWeek) level = v > 6 ? 1 : 0;
      else if (isWeekday) level = v > 3 ? Math.min(4, v - 1) : v > 1 ? 1 : 0;
      else level = v > 7 ? 1 : 0;

      cells.push(level);
    }
  }
  return cells;
}

export function GitHubHeatmap() {
  const cells = useMemo(() => generateContributions(), []);

  const totalContributions = cells.reduce((a, b) => a + b, 0);
  const activeDays = cells.filter((c) => c > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = cells.length - 1; i >= 0; i--) {
      if (cells[i] > 0) streak++;
      else if (streak > 0) break;
    }
    return streak;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="card-surface rounded-xl p-5 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">Contribuições</span>
        </div>
        <span className="mono-label">
          {new Date().getFullYear()}
        </span>
      </div>

      {/* Mini stats */}
      <div className="mt-4 flex gap-6">
        <div>
          <p className="font-display text-xl font-bold text-foreground tabular-nums">{totalContributions}</p>
          <p className="text-[10px] text-muted-foreground">contribuições</p>
        </div>
        <div>
          <p className="font-display text-xl font-bold text-foreground tabular-nums">{activeDays}</p>
          <p className="text-[10px] text-muted-foreground">dias ativos</p>
        </div>
        <div>
          <p className="font-display text-xl font-bold text-[var(--color-accent-copper)] tabular-nums">{currentStreak}</p>
          <p className="text-[10px] text-muted-foreground">sequência atual</p>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="mt-5 overflow-x-auto">
        <div className="relative inline-flex flex-col gap-[3px] min-w-fit">
          {/* Grid */}
          <div className="flex gap-[3px]">
            {Array.from({ length: 52 }).map((_, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, d) => {
                  const idx = w * 7 + d;
                  const level = cells[idx] ?? 0;
                  return (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.15, delay: Math.min(idx * 0.002, 0.8) }}
                      className="h-[10px] w-[10px] rounded-[2px]"
                      style={{ backgroundColor: `var(--heatmap-${level})` }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level legend */}
      <div className="mt-4 flex items-center justify-end gap-1.5">
        <span className="text-[10px] text-muted-foreground/60">Menos</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-[10px] w-[10px] rounded-[2px]"
            style={{ backgroundColor: `var(--heatmap-${level})` }}
          />
        ))}
        <span className="text-[10px] text-muted-foreground/60">Mais</span>
      </div>

      {/* CSS Variables for heatmap colors (theme-aware) */}
      <style>{`
        :root {
          --heatmap-0: rgba(0,0,0,0.04);
          --heatmap-1: rgba(180,90,70,0.25);
          --heatmap-2: rgba(180,90,70,0.5);
          --heatmap-3: rgba(180,90,70,0.75);
          --heatmap-4: #B45A46;
        }
        .dark {
          --heatmap-0: rgba(255,255,255,0.04);
          --heatmap-1: rgba(229,80,80,0.25);
          --heatmap-2: rgba(229,80,80,0.5);
          --heatmap-3: rgba(229,80,80,0.75);
          --heatmap-4: #E55050;
        }
      `}</style>
    </motion.div>
  );
}