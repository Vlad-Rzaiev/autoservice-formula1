"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import { cardsItems } from "@/app/[locale]/(marketing)/_components/whyUs/cardsItems";

export interface WhyUsProps {
  children?: React.ReactNode;
}

export default function WhyUs({}: WhyUsProps) {
  const t = useTranslations();

  return (
    <Section id="why-us">
      <Container>
        <SectionTitle>{t("marketing.why-us.title")}</SectionTitle>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {cardsItems.map((item) => {
            return (
              <li
                key={item.id}
                className="
                  group relative flex min-h-64 flex-col overflow-hidden
                  rounded-2xl border border-border bg-surface p-6
                  shadow-sm transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-red-500/40
                  hover:shadow-[0_20px_45px_-24px_rgba(220,38,38,0.45)]
                  sm:p-7
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 top-0 h-1
                    origin-left scale-x-0 bg-red-600
                    transition-transform duration-300
                    group-hover:scale-x-100
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute -right-16 -top-16 size-36 rounded-full
                    bg-red-500/0 blur-3xl
                    transition-colors duration-300
                    group-hover:bg-red-500/10
                  "
                />

                <div
                  className="
                    relative mb-8 flex size-12 items-center justify-center
                    rounded-xl border border-red-500/20
                    bg-red-500/10 text-red-600
                    transition-all duration-300
                    group-hover:scale-105
                    group-hover:border-red-500
                    group-hover:bg-red-600
                    group-hover:text-white
                    dark:text-red-400
                    dark:group-hover:text-white
                  "
                >
                  <FontAwesomeIcon icon={item.icon} className="text-3xl" />
                </div>

                <div className="relative mt-auto">
                  <h3
                    className="
                      text-xl font-semibold tracking-tight text-foreground
                      transition-colors duration-300
                      group-hover:text-red-600
                      dark:group-hover:text-red-400
                    "
                  >
                    {t(item.title)}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {t(item.description)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
