"use client";

import { useCallback, useRef, type MouseEvent } from "react";

/**
 * Returns event handlers that track mouse position on a card
 * and set CSS custom properties for the radial gradient glow effect.
 */
export function useCardGlow<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mouse-x", "50%");
    ref.current.style.setProperty("--mouse-y", "50%");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}