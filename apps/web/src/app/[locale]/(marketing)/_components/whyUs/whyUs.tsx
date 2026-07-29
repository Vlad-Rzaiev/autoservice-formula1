"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cardsItems } from "@/app/[locale]/(marketing)/_components/whyUs/cardsItems";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import { IconCard } from "@/app/components/common/icon-card";
import CardGrid from "@/app/components/common/card-grid/card-grid";

export interface WhyUsProps {
  children?: React.ReactNode;
}

export default function WhyUs({}: WhyUsProps) {
  const t = useTranslations();

  return (
    <Section id="why-us">
      <Container>
        <SectionTitle className="mb-8 lg:mb-12">
          {t("marketing.why-us.title")}
        </SectionTitle>

        <CardGrid columns="four">
          {cardsItems.map((item) => (
            <li key={item.id}>
              <IconCard
                icon={item.icon}
                title={t(item.title)}
                description={t(item.description)}
                className="
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-red-500/30
                  hover:shadow-lg
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </li>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
}
