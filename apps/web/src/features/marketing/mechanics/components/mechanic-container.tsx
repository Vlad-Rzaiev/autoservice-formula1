'use client';

import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { ServiceCta, useMechanicById } from '@/features/marketing';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { useLocale, useTranslations } from 'next-intl';
import { QueryState } from '@/components/states';
import MechanicPageSkeleton from './mechanic-page-skeleton';
import MechanicHero from './mechanic-hero';
import MechanicAbout from './mechanic-about';
import MechanicSpecializations from './mechanic-specializations';
import MechanicWorkDirections from './mechanic-work-directions';
import MechanicCertificates from './mechanic-certificates';

interface MechanicContainerProps {
  mechanicId: string;
}

export default function MechanicContainer({
  mechanicId,
}: MechanicContainerProps) {
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  const t = useTranslations('marketing.specialists');

  const {
    data: mechanic,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useMechanicById(mechanicId);

  const fullNameTranslate = `${mechanic?.name[currentLocale].firstName} ${mechanic?.name[currentLocale].lastName}`;
  const descriptionTranslate =
    mechanic?.translations[currentLocale].description;

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      isEmpty={!mechanic}
      loadingContent={<MechanicPageSkeleton />}
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
      {mechanic && (
        <>
          <MechanicHero
            photoUrl={mechanic.photo.url}
            fullName={fullNameTranslate}
            description={descriptionTranslate}
            experienceYears={mechanic.experienceYears}
          />

          <MechanicAbout
            description={descriptionTranslate}
            experience={mechanic.experienceYears}
            specializations={mechanic.specializations}
            workDirections={mechanic.workDirections}
          />

          <MechanicSpecializations specializations={mechanic.specializations} />

          <MechanicWorkDirections workDirections={mechanic.workDirections} />

          <MechanicCertificates certificates={mechanic.certificates} />

          <ServiceCta />
        </>
      )}
    </QueryState>
  );
}
