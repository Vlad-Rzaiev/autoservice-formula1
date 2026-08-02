"use client";

import { useTranslations } from "next-intl";
import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";

export default function ServicesCatalogContainer() {
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useServices();

  return (
    <>
      <SectionTitle className="sr-only">
        {t("services.allServices.title")}
      </SectionTitle>

      <ServicesCatalog
        services={services}
        isPending={isPending}
        isError={isError}
        isRefetching={isRefetching}
        refetch={refetch}
      />
    </>
  );
}
