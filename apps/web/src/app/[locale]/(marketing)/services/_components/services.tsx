"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Wrench } from "lucide-react";
import { useFeaturedServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import {
  serviceLocales,
  type ServiceLocale,
} from "@/app/[locale]/(marketing)/services/model/service.types";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import LoadingState from "@/app/components/states/loading-state";
import ErrorState from "@/app/components/states/error-state";
import EmptyState from "@/app/components/states/empty-state";
import ServiceCard from "@/app/[locale]/(marketing)/services/_components/service-card";

function isServiceLocale(locale: string): locale is ServiceLocale {
  return serviceLocales.includes(locale as ServiceLocale);
}

export interface ServicesProps {
  children?: React.ReactNode;
}

export default function Services({}: ServicesProps) {
  const locale = useLocale();
  const currentLocale: ServiceLocale = isServiceLocale(locale) ? locale : "pl";

  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useFeaturedServices();

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col items-center">
          <SectionTitle>{t("marketing.services.title")}</SectionTitle>

          <p className="mt-5 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
            {t("marketing.services.description")}
          </p>
        </div>

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
          <>
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

            <div className="mt-10 flex justify-center lg:mt-14">
              <Link
                href="/services"
                className="
              group inline-flex min-h-12 items-center justify-center gap-2
              rounded-xl bg-red-600 px-6 py-3
              text-sm font-semibold text-white
              shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-red-700
              hover:shadow-[0_16px_35px_-14px_rgba(220,38,38,0.9)]
              active:translate-y-0
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
              >
                {t("marketing.services.view-all")}

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
