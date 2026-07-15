"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * Premium animated canvas background.
 * - Floating particle network with subtle connections
 * - Reacts softly to mouse position (parallax)
 * - Uses brand palette (emerald/teal/violet/amber)
 * - DPR-aware, RAF-throttled, pauses when tab hidden
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    const palette =
      resolvedTheme === "light"
        ? ["#10b981", "#14b8a6", "#8b5cf6", "#f59e0b"]
        : ["#34d399", "#2dd4bf", "#a78bfa", "#fbbf24"];

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let particles: P[] = [];

    const build = () => {
      const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Mouse repel (soft)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14000) {
          const f = (14000 - dist2) / 14000;
          p.x += (dx / Math.sqrt(dist2 + 1)) * f * 0.8;
          p.y += (dy / Math.sqrt(dist2 + 1)) * f * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55;
        ctx.fill();
      }

      // Connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.strokeStyle = a.c;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [resolvedTheme]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora blobs */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      <div
        className="absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full blur-[120px] opacity-50 animate-aurora"
        style={{ background: "var(--bg-glow-1)" }}
      />
      <div
        className="absolute top-1/3 -right-24 h-[34rem] w-[34rem] rounded-full blur-[120px] opacity-40 animate-aurora"
        style={{ background: "var(--bg-glow-2)", animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full blur-[120px] opacity-30 animate-aurora"
        style={{ background: "var(--bg-glow-3)", animationDelay: "-12s" }}
      />
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      {/* Top vignette to anchor navbar */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
