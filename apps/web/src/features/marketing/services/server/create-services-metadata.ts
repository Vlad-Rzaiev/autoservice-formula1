import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ServiceLocale } from '@autoservice/contracts';

interface CreateServicesMetadataParams {
  locale: ServiceLocale;
}

export async function createServicesMetadata({
  locale,
}: CreateServicesMetadataParams): Promise<Metadata> {
  const [translateServices, translateMetadata] = await Promise.all([
    getTranslations({
      locale,
      namespace: 'services',
    }),
    getTranslations({
      locale,
      namespace: 'metadata',
    }),
  ]);

  return {
    title: `${translateServices('allServices.title')} | ${translateMetadata('title')}`,

    openGraph: {
      title: `${translateServices('allServices.title')} | ${translateMetadata('title')}`,
    },

    twitter: {
      title: `${translateServices('allServices.title')} | ${translateMetadata('title')}`,
    },
  };
}
