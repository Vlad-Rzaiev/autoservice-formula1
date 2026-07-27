"use client";

import { useLocale, useTranslations } from "next-intl";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import {
  Service,
  serviceLocales,
  type ServiceLocale,
} from "@/app/[locale]/(marketing)/services/model/service.types";
import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import ServiceCard from "@/app/[locale]/(marketing)/services/_components/service-card";
import LoadingState from "@/app/components/states/loading-state";
import ErrorState from "@/app/components/states/error-state";
import EmptyState from "@/app/components/states/empty-state";

function isServiceLocale(locale: string): locale is ServiceLocale {
  return serviceLocales.includes(locale as ServiceLocale);
}

type ServicesRefetch = ReturnType<typeof useServices>["refetch"];

export interface ServicesCatalogProps {
  services: Service[];
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: ServicesRefetch;
}

export default function ServicesCatalog({
  services,
  isPending,
  isError,
  isFetching,
  refetch,
}: ServicesCatalogProps) {
  const locale = useLocale();
  const currentLocale: ServiceLocale = isServiceLocale(locale) ? locale : "pl";

  const t = useTranslations();

  return (
    <>
      {isPending ? (
        <LoadingState title={t("marketing.loading-state.loading-title")} />
      ) : isError ? (
        <ErrorState
          title={t("marketing.loading-state.error-title")}
          description={t("marketing.loading-state.error-description")}
          retryLabel={t("marketing.loading-state.retry")}
          isRetrying={isFetching}
          onRetry={() => void refetch()}
        />
      ) : services.length === 0 ? (
        <EmptyState
          title={t("marketing.loading-state.empty-title")}
          description={t("marketing.loading-state.empty-description")}
          icon={faScrewdriverWrench}
        />
      ) : (
        <ul
          id="services-catalog"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service) => {
            const serviceTranslation = service.translations[currentLocale];

            return (
              <ServiceCard
                key={service._id}
                id={service._id}
                icon={service.iconKey}
                title={serviceTranslation.title}
                description={serviceTranslation.description}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
