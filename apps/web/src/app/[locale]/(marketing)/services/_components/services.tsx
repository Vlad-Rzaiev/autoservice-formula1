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
import { serviceIconMap } from "@/app/[locale]/(marketing)/services/lib/service-icon-map";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

function isServiceLocale(locale: string): locale is ServiceLocale {
  return serviceLocales.includes(locale as ServiceLocale);
}

export interface ServicesProps {
  children?: React.ReactNode;
}

export default function Services({}: ServicesProps) {
  const locale = useLocale();
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    refetch,
  } = useFeaturedServices();

  const currentLocale: ServiceLocale = isServiceLocale(locale) ? locale : "uk";

  if (isPending) {
    return (
      <p className="mt-10 text-center text-muted-foreground">
        {t("marketing.services.loading")}
      </p>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 text-center">
        <p className="text-destructive">{t("marketing.services.error")}</p>

        <button
          type="button"
          className="mt-4 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
          onClick={() => refetch()}
        >
          {t("marketing.services.retry")}
        </button>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <p className="mt-10 text-center text-muted-foreground">
        {t("marketing.services.empty")}
      </p>
    );
  }

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col items-center">
          <SectionTitle>{t("marketing.services.title")}</SectionTitle>

          <p className="mt-5 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
            {t("marketing.services.description")}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {services.map((service) => {
            const Icon = serviceIconMap[service.iconKey] ?? Wrench;
            const serviceTranslation = service.translations[currentLocale];

            return (
              <li
                key={service._id}
                className="
                  group relative flex min-h-64 flex-col overflow-hidden
                  rounded-2xl border border-border bg-surface p-6
                  shadow-sm transition-all duration-300
                  hover:-translate-y-1
                  hover:border-red-500/40
                  hover:shadow-[0_20px_45px_-24px_rgba(220,38,38,0.45)]
                  sm:p-7
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 top-0 h-1
                    origin-left scale-x-0 bg-red-600
                    transition-transform duration-300
                    group-hover:scale-x-100
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute -right-20 -top-20 size-44 rounded-full
                    bg-red-500/0 blur-3xl
                    transition-colors duration-300
                    group-hover:bg-red-500/10
                  "
                />

                <div
                  className="
                    relative flex size-12 items-center justify-center
                    rounded-xl border border-red-500/20
                    bg-red-500/10 text-red-600
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:border-red-500
                    group-hover:bg-red-600
                    group-hover:text-white
                    dark:group-hover:text-white
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="relative mt-7">
                  <h3
                    className="
                      text-xl font-semibold tracking-tight text-foreground
                      transition-colors duration-300
                      group-hover:text-red-600
                      dark:group-hover:text-red-400
                    "
                  >
                    {serviceTranslation.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {serviceTranslation.description}
                  </p>
                </div>
              </li>
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
      </Container>
    </Section>
  );
}
