import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { getLocale } from "next-intl/server";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { AppProviders } from "@/providers";

import "@/styles/globals.css";

config.autoAddCss = false;

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

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
      className={geist.variable}
    >
      <body id="top" className={plusJakartaSans.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
