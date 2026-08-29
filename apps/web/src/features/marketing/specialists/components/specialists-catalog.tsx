import { useTranslations } from 'next-intl';
import { useMechanics } from '../api/use-mechanics';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { MechanicDto } from '@autoservice/contracts';
import { CardGrid } from '@/components/common';
import { QueryState } from '@/components/states';
import SpecialistCard from './specialist-card';
import SpecialistCatalogSkeleton from './specialist-catalog-skeleton';

type MechanicsRefetch = ReturnType<typeof useMechanics>['refetch'];

export interface SpecialistsCatalogProps {
  mechanics: MechanicDto[];
  isPending: boolean;
  isError: boolean;
  isRefetching: boolean;
  refetch: MechanicsRefetch;
}

export default function SpecialistsCatalog({
  mechanics,
  isPending,
  isError,
  isRefetching,
  refetch,
}: SpecialistsCatalogProps) {
  const t = useTranslations('marketing.specialists');

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      isEmpty={mechanics.length === 0}
      loadingContent={<SpecialistCatalogSkeleton />}
      loadingMessage={t('loading-state.loading-title')}
      errorMessage={t('loading-state.error-title')}
      errorDescription={t('loading-state.error-description')}
      retryLabel={t('loading-state.retry')}
      isRetrying={isRefetching}
      onRetry={() => void refetch()}
      emptyMessage={t('loading-state.empty-title')}
      emptyDescription={t('loading-state.empty-description')}
      emptyIcon={faScrewdriverWrench}
    >
      <CardGrid columns="three" gap="large">
        {mechanics.map((mechanic) => (
          <SpecialistCard key={mechanic._id} mechanic={mechanic} />
        ))}
      </CardGrid>
    </QueryState>
  );
}
