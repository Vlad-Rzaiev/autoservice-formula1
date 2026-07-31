import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface RepairProcessProps {
  children?: React.ReactNode;
}

export default function RepairProcess({}: RepairProcessProps) {
  const t = useTranslations();

  return (
    <Section id="repair-process">
      <Container>
        <SectionTitle>{t("marketing.repair-process.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
