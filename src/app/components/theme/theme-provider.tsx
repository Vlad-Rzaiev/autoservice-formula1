"use client";

import { ThemeProvider } from "next-themes";

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}
