import React from "react";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: Omit<MarketingLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata.og" });
  const imageUrl = t("image");
  const imageAlt = t("imageAlt");
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        uk: "/uk",
        en: "/en",
        pl: "/pl",
      },
    },

    openGraph: {
      type: "website",
      siteName: "Formula 1",
      locale: t("openGraphLocale"),
      url: `/${locale}`,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return children;
}
