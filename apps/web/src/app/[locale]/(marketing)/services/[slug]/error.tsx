"use client";

import { useTranslations } from "next-intl";
import { Section, Container } from "@/components/layout";
import { ErrorState } from "@/components/states";

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
