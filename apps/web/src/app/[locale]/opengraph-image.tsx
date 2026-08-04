import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/config";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

export const alt = "Formula 1";

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

function BrandMark() {
  return (
    <div
      style={{
        display: "flex",
        height: "58px",
        alignItems: "center",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "14px",
        background: "rgba(8,10,15,0.88)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "6px",
          height: "100%",
          background: "#ef4444",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          fontSize: "34px",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.08em",
          color: "#ffffff",
        }}
      >
        F
        <span
          style={{
            marginLeft: "5px",
            color: "#ef4444",
          }}
        >
          1
        </span>
        <div
          style={{
            display: "flex",
            marginLeft: "17px",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "4px",
              borderRadius: "999px",
              background: "#ef4444",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "20px",
              height: "4px",
              borderRadius: "999px",
              background: "#ef4444",
            }}
          />
        </div>
      </div>
    </div>
  );
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

  const titleFontSize = title.length > 48 ? 52 : title.length > 40 ? 56 : 60;

  const heroImage = await readFile(
    join(process.cwd(), "public", "images", "og", "hero-desktop.jpg"),
    "base64",
  );

  const heroImageSrc = `data:image/jpeg;base64,${heroImage}`;

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImageSrc}
        alt=""
        width={size.width}
        height={size.height}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(4,6,10,0.98) 0%, rgba(4,6,10,0.94) 38%, rgba(4,6,10,0.68) 66%, rgba(4,6,10,0.18) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.58) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-180px",
          right: "125px",
          display: "flex",
          width: "105px",
          height: "980px",
          transform: "rotate(18deg)",
          background:
            "linear-gradient(180deg, rgba(239,68,68,0) 0%, rgba(239,68,68,0.38) 50%, rgba(239,68,68,0) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "64px",
          right: "52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "10px",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "126px",
            height: "5px",
            background: "#ef4444",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "86px",
            height: "5px",
            background: "#ef4444",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "48px",
            height: "5px",
            background: "#ef4444",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: "-20px",
          bottom: "-70px",
          display: "flex",
          fontSize: "245px",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "-0.12em",
          color: "rgba(255,255,255,0.07)",
        }}
      >
        F1
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          padding: "50px 64px 44px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <BrandMark />

          <div
            style={{
              display: "flex",
              maxWidth: "480px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "21px",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "rgba(255,255,255,0.94)",
              }}
            >
              {brandTitle}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "6px",
                alignItems: "center",
                gap: "9px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.58)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: "#ef4444",
                }}
              />

              {siteConfig.address.display}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: "780px",
            marginTop: "62px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "72px",
              height: "7px",
              marginBottom: "24px",
              borderRadius: "999px",
              background: "#ef4444",
            }}
          />

          <div
            style={{
              display: "flex",
              paddingLeft: "24px",
              borderLeft: "7px solid #ef4444",
              fontSize: `${titleFontSize}px`,
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: "-0.045em",
              color: "#ffffff",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              maxWidth: "690px",
              marginTop: "24px",
              fontSize: "23px",
              fontWeight: 500,
              lineHeight: 1.42,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "58px",
              height: "4px",
              background: "#ef4444",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "25px",
              height: "4px",
              background: "rgba(255,255,255,0.7)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "4px",
              background: "rgba(255,255,255,0.35)",
            }}
          />
        </div>
      </div>
    </div>,
    { ...size },
  );
}
