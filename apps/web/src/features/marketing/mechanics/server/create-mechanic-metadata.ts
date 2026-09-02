import { Metadata } from 'next';
import type { AppLocale, MechanicDto } from '@autoservice/contracts';
import { getTranslations } from 'next-intl/server';

interface CreateMechanicMetadataParams {
  locale: AppLocale;
  mechanic: MechanicDto;
}

export async function createMechanicMetadata({
  locale,
  mechanic,
}: CreateMechanicMetadataParams): Promise<Metadata> {
  const nameTranslation = mechanic.name[locale];
  const fullName = `${nameTranslation.firstName} ${nameTranslation.lastName}`;
  const descriptionTranslation = mechanic.translations[locale].description;

  const translateMetadata = await getTranslations({
    locale,
    namespace: 'metadata',
  });

  return {
    title: `${translateMetadata('mechanics.title')} ${fullName}`,
    description: descriptionTranslation,

    openGraph: {
      title: `${translateMetadata('mechanics.title')} ${fullName}`,
      description: descriptionTranslation,
    },

    twitter: {
      title: `${translateMetadata('mechanics.title')} ${fullName}`,
      description: descriptionTranslation,
    },
  };
}
