"use client";

import { useTranslations } from "next-intl";
import { useServices, ServicesCatalog } from "@/features/marketing/services";
import { SectionTitle } from "@/components";

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
