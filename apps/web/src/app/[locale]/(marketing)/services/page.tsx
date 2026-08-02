import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAppLocale } from "@/i18n/locale-config";

import { servicesQueryOptions } from "@/app/[locale]/(marketing)/services/api/services-query-options";
import { createServicesMetadata } from "@/features/services/server/create-services-metadata";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import ServicesHero from "@/app/[locale]/(marketing)/services/_components/services-hero";
import ServicesCatalogContainer from "@/app/[locale]/(marketing)/services/_components/services-catalog-container";
import ServicesCta from "@/app/[locale]/(marketing)/services/_components/services-cta";

export interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return createServicesMetadata({ locale });
}

export default async function ServicesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(servicesQueryOptions);

  return (
    <>
      <ServicesHero />

      <Section>
        <Container>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ServicesCatalogContainer />
          </HydrationBoundary>
        </Container>
      </Section>

      <ServicesCta />
    </>
  );
}
