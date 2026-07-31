import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface CompletedWorksProps {
  children?: React.ReactNode;
}

export default function CompletedWorks({}: CompletedWorksProps) {
  const t = useTranslations();

  return (
    <Section id="completed-works">
      <Container>
        <SectionTitle>{t("marketing.completed-works.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
