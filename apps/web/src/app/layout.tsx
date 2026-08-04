import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getLocale } from "next-intl/server";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { AppProviders } from "@/providers";

import "@/styles/globals.css";

config.autoAddCss = false;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={plusJakartaSans.variable}
    >
      <body id="top">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
