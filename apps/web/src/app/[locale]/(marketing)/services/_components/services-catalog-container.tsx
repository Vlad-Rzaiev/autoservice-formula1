"use client";

import { useServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";

export default function ServicesCatalogContainer() {
  const {
    data: services = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useServices();

  return (
    <ServicesCatalog
      services={services}
      isPending={isPending}
      isError={isError}
      isRefetching={isRefetching}
      refetch={refetch}
    />
  );
}
