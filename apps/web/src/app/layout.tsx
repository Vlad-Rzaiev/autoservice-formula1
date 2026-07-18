import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { getLocale } from "next-intl/server";

import { MobileMenuProvider } from "@/providers/mobile-menu-provider";
import AppProviders from "@/providers/app-providers";
import ClientGate from "@/app/components/common/client-gate";

import "./globals.css";

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
    <html lang={locale} suppressHydrationWarning className={geist.variable}>
      <body id="top" className={plusJakartaSans.className}>
        <AppProviders>
          <MobileMenuProvider>
            <ClientGate>{children}</ClientGate>
          </MobileMenuProvider>
        </AppProviders>
      </body>
    </html>
  );
}
