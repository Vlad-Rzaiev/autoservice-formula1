"use client";

import { Link } from "@/i18n/navigation";
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
      )}
    </>
  );
}
