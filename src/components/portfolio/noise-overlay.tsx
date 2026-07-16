"use client";

/**
 * Noise/grain texture overlay — SVG turbulence filter.
 * Very subtle, fixed, pointer-events-none.
 * Applied via the CSS .noise-overlay utility class.
 * This component just renders the div.
 */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden />;
}