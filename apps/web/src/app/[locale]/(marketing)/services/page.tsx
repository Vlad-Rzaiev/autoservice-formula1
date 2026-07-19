"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesHero from "@/app/[locale]/(marketing)/services/_components/services-hero";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";
import ServicesCta from "@/app/[locale]/(marketing)/services/_components/services-cta";

export interface PageProps {
  children?: React.ReactNode;
}

export default function Page({}: PageProps) {
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
      <SectionTitle className="sr-only">
        {t("services.allServices.title")}
      </SectionTitle>

      <ServicesHero />

      <ServicesCatalog
        services={services}
        isPending={isPending}
        isError={isError}
        isFetching={isFetching}
        refetch={refetch}
      />

      <ServicesCta />
    </main>
  );
}
