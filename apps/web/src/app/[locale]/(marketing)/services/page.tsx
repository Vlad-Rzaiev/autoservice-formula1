"use client";

import React from "react";
import { Wrench } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import {
  serviceLocales,
  type ServiceLocale,
} from "@/app/[locale]/(marketing)/services/model/service.types";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import ServiceCard from "@/app/[locale]/(marketing)/services/_components/service-card";
import LoadingState from "@/app/components/states/loading-state";
import ErrorState from "@/app/components/states/error-state";
import EmptyState from "@/app/components/states/empty-state";

function isServiceLocale(locale: string): locale is ServiceLocale {
  return serviceLocales.includes(locale as ServiceLocale);
}

export interface PageProps {
  children?: React.ReactNode;
}

export default function Page({}: PageProps) {
  const locale = useLocale();
  const currentLocale: ServiceLocale = isServiceLocale(locale) ? locale : "pl";

  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useServices();

  return (
    <main>
      <Section className="overflow-hidden">
        <Container>
          <SectionTitle>{t("services.allServices.title")}</SectionTitle>

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
              icon={Wrench}
            />
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
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
        </Container>
      </Section>
    </main>
  );
}
