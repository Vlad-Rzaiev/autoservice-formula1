"use client";

import { ThemeProvider } from "next-themes";

type AppProvidersProps = {
  children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
}
