"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated counter that runs once when scrolled into view.
 * Uses requestAnimationFrame with easeOutExpo.
 */
export function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(2, -10 * t);

    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const v = target * ease(p);
      setValue(target >= 100 ? Math.round(v) : Math.round(v * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

/** Hook that returns true once the element enters the viewport. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
