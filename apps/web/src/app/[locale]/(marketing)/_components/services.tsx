"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useFeaturedServices } from "@/app/[locale]/(marketing)/services/api/use-services";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesCatalog from "@/app/[locale]/(marketing)/services/_components/services-catalog";
import ButtonLink from "@/app/components/common/button-link/button-link";

export default function Services() {
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useFeaturedServices();

  const hasLoadedServices = !isPending && !isError && services.length > 0;

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col items-center">
          <SectionTitle>{t("marketing.services.title")}</SectionTitle>

          <p className="mt-5 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
            {t("marketing.services.description")}
          </p>
        </div>

        <div className="mt-10 md:mt-12 lg:mt-14">
          <ServicesCatalog
            services={services}
            isPending={isPending}
            isError={isError}
            isFetching={isFetching}
            refetch={refetch}
          />
        </div>

        {hasLoadedServices && (
          <div className="mt-10 flex justify-center md:mt-12">
            <ButtonLink href="/services" variant="outline">
              {t("marketing.services.view-all")}

              <FontAwesomeIcon
                icon={faAngleRight}
                aria-hidden="true"
                className="text-lg transition-transform duration-200 group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
