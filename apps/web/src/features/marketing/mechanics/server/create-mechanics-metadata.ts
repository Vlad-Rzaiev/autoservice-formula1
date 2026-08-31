import { Metadata } from 'next';
import { AppLocale } from '@autoservice/contracts';
import { getTranslations } from 'next-intl/server';

interface CreateMechanicsMetadataParams {
  locale: AppLocale;
}

export async function createMechanicsMetadata({
  locale,
}: CreateMechanicsMetadataParams): Promise<Metadata> {
  const translation = await getTranslations({
    locale,
    namespace: 'metadata',
  });

  return {
    title: `${translation('mechanics.all-mechanics')} | ${translation('title')}`,

    openGraph: {
      title: `${translation('mechanics.all-mechanics')} | ${translation('title')}`,
    },

    twitter: {
      title: `${translation('mechanics.all-mechanics')} | ${translation('title')}`,
    },
  };
}
