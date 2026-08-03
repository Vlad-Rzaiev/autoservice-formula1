import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { clientMessageModules, getClientMessages } from "@/messages";
import { AuthFooter, AuthHeader, AuthShell } from "@/features/auth";

interface AuthLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getClientMessages(clientMessageModules.auth);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col items-center justify-center min-h-dvh">
        <AuthHeader />
        <AuthShell className="flex-1">{children}</AuthShell>
        <AuthFooter />
      </div>
    </NextIntlClientProvider>
  );
}
