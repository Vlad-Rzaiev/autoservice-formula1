import React from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { clientMessageModules, getClientMessages } from "@/messages";

export interface LayoutProps {
  children?: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function DashboardLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getClientMessages(clientMessageModules.dashboard);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <main className="pt-(--marketing-header-height)">{children}</main>
    </NextIntlClientProvider>
  );
}
