import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface ReviewsProps {
  children?: React.ReactNode;
}

export default function Reviews({}: ReviewsProps) {
  const t = useTranslations();

  return (
    <Section id="reviews">
      <Container>
        <SectionTitle>{t("marketing.reviews.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
