import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { isAppLocale } from "@/i18n/locale-config";

import {
  servicesQueryOptions,
  createServicesMetadata,
  ServicesHero,
  ServicesCatalogContainer,
  ServicesCta,
} from "@/features/marketing/services";
import { Section, Container } from "@/components";

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
