"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesHero from "@/app/[locale]/(marketing)/services/_components/services-hero";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";
import ServicesCta from "@/app/[locale]/(marketing)/services/_components/services-cta";

export interface ServicesPageProps {
  children?: React.ReactNode;
}

export default function ServicesPage({}: ServicesPageProps) {
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useServices();

  return (
    <>
      <ServicesHero servicesCount={services.length} />

      <Section>
        <Container>
          <SectionTitle className="sr-only">
            {t("services.allServices.title")}
          </SectionTitle>

          <ServicesCatalog
            services={services}
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            refetch={refetch}
          />
        </Container>
      </Section>

      <ServicesCta />
    </>
  );
}
