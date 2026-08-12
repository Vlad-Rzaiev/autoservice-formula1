import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { MobileMenuProvider } from '@/providers';
import { MarketingHeader, MarketingFooter } from '@/features/marketing';
import { clientMessageModules, getClientMessages } from '@/messages';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: Omit<MarketingLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata.og' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        uk: '/uk',
        en: '/en',
        pl: '/pl',
      },
    },

    openGraph: {
      type: 'website',
      siteName: 'Formula 1',
      locale: t('openGraphLocale'),
      url: `/${locale}`,
      title,
      description,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'AutoService Formula 1',
          type: 'image/png',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getClientMessages(clientMessageModules.marketing);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MobileMenuProvider>
        <MarketingHeader />
        <main className="pt-(--marketing-header-height)">{children}</main>
        <MarketingFooter />
      </MobileMenuProvider>
    </NextIntlClientProvider>
  );
}
