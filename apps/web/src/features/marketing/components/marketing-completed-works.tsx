'use client';

import { useTranslations } from 'next-intl';
import { Section, Container, SectionHeader } from '@/components/layout';
import { useFeaturesCompletedWorks } from '../completed-works/api/use-completed-works';
import CompletedWorksCatalog from '../completed-works/components/completed-works-catalog';

export default function MarketingCompletedWorks() {
  const t = useTranslations('marketing.completed-works');

  const {
    data: completedWorks = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useFeaturesCompletedWorks();

  // const hasLoadedCompletedWorks =
  // !isPending && !isError && completedWorks.length > 0;

  return (
    <Section id="completed-works">
      <Container>
        <SectionHeader
          sectionTitle={t('title')}
          description={t('description')}
        />

        <CompletedWorksCatalog
          completedWorks={completedWorks}
          isPending={isPending}
          isError={isError}
          isRefetching={isRefetching}
          refetch={refetch}
        />
      </Container>
    </Section>
  );
}
