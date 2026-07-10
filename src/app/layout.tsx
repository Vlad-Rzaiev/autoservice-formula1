import { Plus_Jakarta_Sans } from "next/font/google";
import AppProviders from "@/app/providers";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
