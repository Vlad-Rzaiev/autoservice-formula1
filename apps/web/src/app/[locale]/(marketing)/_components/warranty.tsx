import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface WarrantyProps {
  children?: React.ReactNode;
}

export default function Warranty({}: WarrantyProps) {
  const t = useTranslations();

  return (
    <Section id="warranty">
      <Container>
        <SectionTitle>{t("marketing.warranty.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
