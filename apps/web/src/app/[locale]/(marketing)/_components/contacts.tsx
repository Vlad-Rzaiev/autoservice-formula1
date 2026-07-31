import Container from "@/app/components/layout/container";
import Section from "@/app/components/layout/section";
import SectionTitle from "@/app/components/layout/section-title";
import { useTranslations } from "next-intl";
import React from "react";

export interface ContactsProps {
  children?: React.ReactNode;
}

export default function Contacts({}: ContactsProps) {
  const t = useTranslations();

  return (
    <Section id="contacts">
      <Container>
        <SectionTitle>{t("marketing.contacts.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
