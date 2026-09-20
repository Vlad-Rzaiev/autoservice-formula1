'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import TanStackQueryProvider from './tanstack-query-provider';
import AuthProvider from './auth-provider';
import { Toaster } from '@/components/ui';

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
        themes={['light', 'dark']}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </TanStackQueryProvider>
  );
}
