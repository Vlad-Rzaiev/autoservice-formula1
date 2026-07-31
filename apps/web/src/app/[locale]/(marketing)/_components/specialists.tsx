import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface SpecialistsProps {
  children?: React.ReactNode;
}

export default function Specialists({}: SpecialistsProps) {
  const t = useTranslations();

  return (
    <Section id="specialists">
      <Container>
        <SectionTitle>{t("marketing.specialists.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
