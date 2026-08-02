"use client";

import { useTranslations } from "next-intl";
import { Section, Container, ErrorState } from "@/components";

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
