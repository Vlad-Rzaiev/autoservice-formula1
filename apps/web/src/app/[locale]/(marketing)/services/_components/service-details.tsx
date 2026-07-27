"use client";

import axios from "axios";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useServiceById } from "@/app/[locale]/(marketing)/services/api/use-services";
import SectionTitle from "@/app/components/layout/section-title";
import LoadingState from "@/app/components/states/loading-state";
import ErrorState from "@/app/components/states/error-state";
import { notFound } from "next/navigation";

export interface ServiceDetailsProps {
  id: string;
}

export default function ServiceDetails({ id }: ServiceDetailsProps) {
  const t = useTranslations();
  const {
    data: service,
    isPending,
    isError,
    error,
    isRefetching,
    refetch,
  } = useServiceById(id);

  const isNotFound =
    axios.isAxiosError(error) && error.response?.status === 404;

  if (isPending) {
    return <LoadingState title={t("services.servicePage.loading-title")} />;
  }

  if (isNotFound) {
    notFound();
  }

  if (isError) {
    return (
      <ErrorState
        title={t("services.servicePage.error-title")}
        description={t("services.servicePage.error-description")}
        retryLabel={t("services.servicePage.retry")}
        isRetrying={isRefetching}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!service) {
    return (
      <ErrorState
        title={t("services.servicePage.error-title")}
        description={t("services.servicePage.error-description")}
      />
    );
  }

  return (
    <>
      <SectionTitle>{t("services.servicePage.title")}</SectionTitle>
      <p className="text-center text-2xl mt-4">ID {id}</p>
      <p
        className="
              mx-auto my-5 max-w-2xl text-center
              text-lg leading-8 text-muted-foreground
              sm:text-xl sm:leading-9
            "
      >
        {t("clients.dev")}
      </p>

      <Link
        href="/"
        className="
              flex mx-auto w-fit min-h-12 items-center justify-center
              gap-2 rounded-xl bg-red-600 px-6 py-3
              text-sm font-semibold text-white
              shadow-[0_14px_34px_-16px_rgba(220,38,38,0.85)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:bg-red-700
              active:translate-y-0 active:scale-[0.98]
            "
      >
        {t("clients.back-to-main")}
      </Link>
    </>
  );
}
