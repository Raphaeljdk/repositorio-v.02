"use client";

import { MotionConfig } from "framer-motion";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}><MotionConfig reducedMotion="user">{children}</MotionConfig></NextThemesProvider>;
}
