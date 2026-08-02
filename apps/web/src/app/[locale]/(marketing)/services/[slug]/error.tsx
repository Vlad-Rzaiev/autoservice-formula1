"use client";

import { useTranslations } from "next-intl";

import ErrorState from "@/app/components/states/error-state";
import Container from "@/app/components/layout/container";
import Section from "@/app/components/layout/section";

interface ServiceErrorProps {
  reset: () => void;
}

export default function ServiceError({ reset }: ServiceErrorProps) {
  const t = useTranslations("services");

  return (
    <Section noTopPadding>
      <Container>
        <ErrorState
          title={t("servicePage.error-title")}
          description={t("servicePage.error-description")}
          retryLabel={t("servicePage.retry")}
          onRetry={reset}
        />
      </Container>
    </Section>
  );
}
