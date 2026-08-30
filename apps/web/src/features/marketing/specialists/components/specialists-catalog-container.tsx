'use client';

import { useTranslations } from 'next-intl';
import { useMechanics } from '../api/use-mechanics';
import SpecialistsCatalog from './specialists-catalog';
import { SectionTitle } from '@/components/layout';

export default function SpecialistsCatalogContainer() {
  const t = useTranslations('marketing.specialists');

  const {
    data: mechanics = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useMechanics();

  return (
    <>
      <SectionTitle className="sr-only">{t('title')}</SectionTitle>

      <SpecialistsCatalog
        mechanics={mechanics}
        isPending={isPending}
        isError={isError}
        isRefetching={isRefetching}
        refetch={refetch}
      />
    </>
  );
}
