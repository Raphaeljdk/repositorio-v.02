"use client";

import { useCallback, useEffect, useRef, type MouseEvent } from "react";

/**
 * Returns event handlers that track mouse position on a card
 * and set CSS custom properties for the radial gradient glow effect.
 */
export function useCardGlow<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const enabled = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => { enabled.current = media.matches; };
    update();
    media.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); cancelAnimationFrame(frame.current); };
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!enabled.current) return;
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      if (!ref.current || !enabled.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mouse-x", `${pointer.current.x - rect.left}px`);
      ref.current.style.setProperty("--mouse-y", `${pointer.current.y - rect.top}px`);
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (!ref.current) return;
    ref.current.style.setProperty("--mouse-x", "50%");
    ref.current.style.setProperty("--mouse-y", "50%");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
