import type { Metadata } from 'next';
import { Section, Container } from '@/components/layout';
import {
  createSpecialistsMetadata,
  mechanicsQueryOptions,
  ServiceCta,
  SpecialistsCatalogContainer,
  SpecialistsHero,
} from '@/features/marketing';
import { isAppLocale } from '@/i18n/locale-config';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export interface SpecialistsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: SpecialistsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return createSpecialistsMetadata({ locale });
}

export default async function SpecialistsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(mechanicsQueryOptions);

  return (
    <>
      <SpecialistsHero />

      <Section noTopPadding>
        <Container>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <SpecialistsCatalogContainer />
          </HydrationBoundary>
        </Container>
      </Section>

      <ServiceCta />
    </>
  );
}
