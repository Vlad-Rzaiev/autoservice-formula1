"use client";

import { useTranslations } from "next-intl";
import SectionTitle from "@/app/components/layout/section-title";
import { useServiceById } from "@/app/[locale]/(marketing)/services/api/use-services";
import LoadingState from "@/app/components/states/loading-state";
import ErrorState from "@/app/components/states/error-state";
import EmptyState from "@/app/components/states/empty-state";
import { Wrench } from "lucide-react";

export interface ServiceDetailsProps {
  id: string;
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const t = useTranslations();
  const {
    data: service,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useServiceById(id);

  console.log(service);

  return (
    <>
      {isPending ? (
        <LoadingState title={t("services.servicePage.loading-title")} />
      ) : isError ? (
        <ErrorState
          title={t("services.servicePage.error-title")}
          description={t("services.servicePage.error-description")}
          retryLabel={t("services.servicePage.retry")}
          isRetrying={isRefetching}
          onRetry={() => void refetch()}
        />
      ) : !service ? (
        <EmptyState
          title={t("services.servicePage.empty-title")}
          description={t("services.servicePage.empty-description")}
          icon={Wrench}
        />
      ) : (
        <>
          <SectionTitle>{t("services.servicePage.title")}</SectionTitle>
          <p>{id}</p>
        </>
      )}
    </>
  );
}
