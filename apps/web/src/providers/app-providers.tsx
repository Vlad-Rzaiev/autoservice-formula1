"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { TanStackQueryProvider } from "@/providers";

export interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <TanStackQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme"
        themes={["light", "dark"]}
      >
        {children}
      </ThemeProvider>
    </TanStackQueryProvider>
  );
}
