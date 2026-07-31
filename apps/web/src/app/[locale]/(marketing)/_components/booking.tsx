import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export interface BookingProps {
  children?: React.ReactNode;
}

export default function Booking({}: BookingProps) {
  const t = useTranslations();

  return (
    <Section id="booking">
      <Container>
        <SectionTitle>{t("marketing.booking.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
