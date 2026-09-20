import React from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { clientMessageModules, getClientMessages } from '@/messages';
import { AuthGuard } from '@/features/auth';

export interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getClientMessages(clientMessageModules.dashboard);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthGuard>
        <main>{children}</main>
      </AuthGuard>
    </NextIntlClientProvider>
  );
}
