import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import AppProviders from "@/providers/providers";
import ClientGate from "@/app/components/client-gate";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={font.className}>
        <AppProviders>
          <ClientGate>{children}</ClientGate>
        </AppProviders>
      </body>
    </html>
  );
}
