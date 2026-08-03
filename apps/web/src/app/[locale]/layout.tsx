import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HtmlLangSync } from "@/components/locale";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: requestedLocale } = await params;

  const locale =
    requestedLocale && hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  const translateMetadata = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: translateMetadata("title"),
    description: translateMetadata("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: requestedLocale } = await params;

  const locale =
    requestedLocale && hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  setRequestLocale(locale);

  return (
    <>
      <HtmlLangSync locale={locale} />
      {children}
    </>
  );
}
