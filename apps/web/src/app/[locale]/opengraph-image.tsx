import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/config";
import { routing } from "@/i18n/routing";

import {
  getOpenGraphTitleFontSize,
  openGraphImageSize,
} from "./opengraph/constants";
import ImageBackground from "./opengraph/image-background";
import ImageContent from "./opengraph/image-content";

export const runtime = "nodejs";

export const alt = "Formula 1";

export const size = openGraphImageSize;

export const contentType = "image/png";

interface OpenGraphImageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;

  const normalizedLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const t = await getTranslations({
    locale: normalizedLocale,
  });

  const brandTitle = t("metadata.title");
  const title = t("metadata.og.title");
  const description = t("metadata.og.description");

  const titleFontSize = getOpenGraphTitleFontSize(title);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : siteConfig.url;

  const heroImageSrc = new URL(
    "/images/og/hero-desktop.jpg",
    baseUrl,
  ).toString();

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#07090d",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <ImageBackground heroImageSrc={heroImageSrc} />

      <ImageContent
        brandTitle={brandTitle}
        title={title}
        description={description}
        address={siteConfig.address.display}
        titleFontSize={titleFontSize}
      />
    </div>,
    {
      ...size,
    },
  );
}
