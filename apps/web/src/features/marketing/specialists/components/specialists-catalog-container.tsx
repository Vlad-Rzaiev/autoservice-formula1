'use client';

import { useTranslations } from 'next-intl';
import { useMechanics } from '../api/use-mechanics';
import SpecialistsCatalog from './specialists-catalog';

export default function SpecialistsCatalogContainer() {
  const t = useTranslations();

  const {
    data: mechanics = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useMechanics();

  return (
    <>
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
