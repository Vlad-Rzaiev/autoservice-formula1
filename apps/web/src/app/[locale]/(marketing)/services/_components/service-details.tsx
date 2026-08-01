"use client";

import axios from "axios";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { useServiceBySlug } from "@/app/[locale]/(marketing)/services/api/use-services";
import QueryState from "@/app/components/states/query-state";
import DevelopmentPlaceholder from "@/app/components/common/development-placeholder";

export interface ServiceDetailsProps {
  slug: string;
}

export default function ServiceDetails({ slug }: ServiceDetailsProps) {
  const t = useTranslations("services");

  const {
    data: service,
    isPending,
    isError,
    error,
    isRefetching,
    refetch,
  } = useServiceBySlug(slug);

  const isNotFound =
    axios.isAxiosError(error) && error.response?.status === 404;

  if (isNotFound) {
    notFound();
  }

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      loadingMessage={t("servicePage.loading-title")}
      errorMessage={t("servicePage.error-title")}
      errorDescription={t("servicePage.error-description")}
      retryLabel={t("servicePage.retry")}
      isRetrying={isRefetching}
      onRetry={() => void refetch()}
    >
      {service && (
        <DevelopmentPlaceholder
          title={t("servicePage.title")}
          slug={slug}
          description={t("servicePage.dev")}
          linkHref="/services"
          linkText={t("servicePage.back-to-services")}
        />
      )}
    </QueryState>
  );
}
