"use client";

/**
 * Quiet atmospheric background — a faint dot grid that fades at the edges,
 * plus soft top/bottom vignettes so the navbar and footer sit cleanly.
 *
 * No animated gradient orbs, no blur blobs — keeps the page feeling like
 * an editorial document rather than a generated landing page.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid dot-grid-fade" />

      {/* Top vignette for navbar */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
