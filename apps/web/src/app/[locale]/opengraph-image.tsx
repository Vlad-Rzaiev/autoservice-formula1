import { hasLocale } from "next-intl";
import { ImageResponse } from "next/og";

import { routing } from "@/i18n/routing";

export const alt = "AutoService Formula 1";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface OpenGraphImageProps {
  params: Promise<{
    locale: string;
  }>;
}

const titles = {
  uk: "Професійний ремонт автомобілів",
  en: "Professional car repair",
  pl: "Profesjonalny serwis samochodowy",
} as const;

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;

  const normalizedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#111827",
        color: "#ffffff",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "68px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {titles[normalizedLocale]}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "28px",
          fontSize: "32px",
        }}
      >
        AutoService Formula 1
      </div>
    </div>,
    size,
  );
}
