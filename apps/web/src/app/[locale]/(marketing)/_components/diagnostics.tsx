import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface DiagnosticsProps {
  children?: React.ReactNode;
}

export default function Diagnostics({}: DiagnosticsProps) {
  const t = useTranslations();
  return (
    <Section id="diagnostics">
      <Container>
        <SectionTitle>{t("marketing.diagnostics.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
