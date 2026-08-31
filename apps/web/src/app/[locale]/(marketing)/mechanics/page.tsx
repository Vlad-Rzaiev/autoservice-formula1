import type { Metadata } from 'next';
import { Section, Container } from '@/components/layout';
import {
  createMechanicsMetadata,
  mechanicsQueryOptions,
  ServiceCta,
  MechanicsCatalogContainer,
  MechanicsHero,
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

  return createMechanicsMetadata({ locale });
}

export default async function SpecialistsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(mechanicsQueryOptions);

  return (
    <>
      <MechanicsHero />

      <Section noTopPadding>
        <Container>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MechanicsCatalogContainer />
          </HydrationBoundary>
        </Container>
      </Section>

      <ServiceCta />
    </>
  );
}
