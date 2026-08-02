import type { Metadata } from "next";

import type { AppLocale, ServiceDto } from "@autoservice/contracts";
import { getTranslations } from "next-intl/server";

interface CreateServiceMetadataParams {
  locale: AppLocale;
  service: ServiceDto;
}

export async function createServiceMetadata({
  locale,
  service,
}: CreateServiceMetadataParams): Promise<Metadata> {
  const translation = service.translations[locale];

  const translateMetadata = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: `${translation.title} | ${translateMetadata("title")}`,
    description: translation.description,

    openGraph: {
      title: `${translation.title} | ${translateMetadata("title")}`,
      description: translation.description,
    },

    twitter: {
      title: `${translation.title} | ${translateMetadata("title")}`,
      description: translation.description,
    },
  };
}
