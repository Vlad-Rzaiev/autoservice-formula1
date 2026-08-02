"use client";

import {
  defaultLocale,
  isAppLocale,
  type AppLocale,
} from "@/i18n/locale-config";

import { useLocale, useTranslations } from "next-intl";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import type { ServiceDto } from "@autoservice/contracts";
import { useServices, ServiceCard } from "@/features/marketing/services";
import { CardGrid, QueryState } from "@/components";

type ServicesRefetch = ReturnType<typeof useServices>["refetch"];

export interface ServicesCatalogProps {
  services: ServiceDto[];
  isPending: boolean;
  isError: boolean;
  isRefetching: boolean;
  refetch: ServicesRefetch;
}

export default function ServicesCatalog({
  services,
  isPending,
  isError,
  isRefetching,
  refetch,
}: ServicesCatalogProps) {
  const locale = useLocale();
  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  const t = useTranslations("marketing");

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      isEmpty={services.length === 0}
      loadingMessage={t("loading-state.loading-title")}
      errorMessage={t("loading-state.error-title")}
      errorDescription={t("loading-state.error-description")}
      retryLabel={t("loading-state.retry")}
      isRetrying={isRefetching}
      onRetry={() => void refetch()}
      emptyMessage={t("loading-state.empty-title")}
      emptyDescription={t("loading-state.empty-description")}
      emptyIcon={faScrewdriverWrench}
    >
      <CardGrid columns="three" gap="large">
        {services.map((service) => {
          const serviceTranslation = service.translations[currentLocale];

          return (
            <ServiceCard
              key={service._id}
              slug={service.slug}
              icon={service.iconKey}
              title={serviceTranslation.title}
              description={serviceTranslation.description}
              actionLabel={t("services.card.details")}
            />
          );
        })}
      </CardGrid>
    </QueryState>
  );
}
