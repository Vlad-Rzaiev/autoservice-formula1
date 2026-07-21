"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useFeaturedServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";

export interface ServicesProps {
  children?: React.ReactNode;
}

export default function Services({}: ServicesProps) {
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useFeaturedServices();

  const hasLoadedServices = !isPending && !isError && services.length > 0;

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col items-center">
          <SectionTitle>{t("marketing.services.title")}</SectionTitle>

          <p className="mt-5 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
            {t("marketing.services.description")}
          </p>
        </div>

        <ServicesCatalog
          services={services}
          isPending={isPending}
          isError={isError}
          isFetching={isFetching}
          refetch={refetch}
        />

        {hasLoadedServices && (
          <div className="flex justify-center">
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
        )}
      </Container>
    </Section>
  );
}
