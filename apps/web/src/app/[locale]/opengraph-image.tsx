import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config';
import { routing } from '@/i18n/routing';

import {
  getOpenGraphTitleFontSize,
  openGraphImageSize,
} from './opengraph/constants';
import ImageBackground from './opengraph/image-background';
import ImageContent from './opengraph/image-content';

export const runtime = 'nodejs';

export const alt = 'Formula 1';

export const size = openGraphImageSize;

export const contentType = 'image/png';

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

  const brandTitle = t('metadata.title');
  const title = t('metadata.og.title');
  const description = t('metadata.og.description');

  const titleFontSize = getOpenGraphTitleFontSize(title);

  const heroImageBuffer = await readFile(
    join(process.cwd(), 'public', 'images', 'og', 'hero-desktop.jpg'),
  );

  const heroImageSrc = `data:image/jpeg;base64,${heroImageBuffer.toString(
    'base64',
  )}`;

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#07090d',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImageSrc}
        alt=""
        width={size.width}
        height={size.height}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <ImageBackground />

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
