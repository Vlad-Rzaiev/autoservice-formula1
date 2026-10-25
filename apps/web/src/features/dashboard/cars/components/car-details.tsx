'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useCar } from '../api/use-cars';
import { useAuth } from '@/providers';
import { QueryState } from '@/components/states';
import CarDetailsSkeleton from './car-details-skeleton';
import CarDetailsHero from './car-details-hero';
import { Container, Section } from '@/components/layout';
import { routes } from '@/config';

interface CarDetailsProps {
  carId: string;
}

export default function CarDetails({ carId }: CarDetailsProps) {
  const t = useTranslations('dashboard.car');
  const router = useRouter();

  const { user } = useAuth();

  const {
    data: car,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useCar(carId, user?.userId);

  const handleEditCar = () => {
    router.push(routes.dashboard.cars.edit(carId));
  };

  const handleViewRepairs = () => {
    router.push(routes.dashboard.cars.repairs(carId));
  };

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      isEmpty={Boolean(!car)}
      loadingMessage={t('loading-state.loading-title')}
      loadingDescription={t('loading-state.loading-description')}
      loadingContent={<CarDetailsSkeleton />}
      errorMessage={t('loading-state.error-title')}
      errorDescription={t('loading-state.error-description')}
      retryLabel={t('loading-state.retry')}
      isRetrying={isFetching}
      onRetry={() => void refetch()}
      emptyMessage={t('loading-state.empty-title')}
      emptyDescription={t('loading-state.empty-description')}
      emptyIcon={faScrewdriverWrench}
    >
      {car && (
        <>
          <Section className="mt-4">
            <Container>
              <div className="relative border-b border-border pb-6">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  {t(
                    user?.role === 'client'
                      ? 'main.your-car'
                      : 'main.client-car',
                  )}
                </span>

                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {car.brand} {car.model}{' '}
                  <span className="whitespace-nowrap text-muted-foreground">
                    {car.year}
                  </span>
                </h1>

                <div className="absolute bottom-0 left-0 h-1 w-16 rounded-full bg-primary" />
              </div>
            </Container>
          </Section>

          <CarDetailsHero
            photos={car.photos}
            brand={car.brand}
            model={car.model}
            year={car.year}
            generation={car.generation}
            licensePlate={car.licensePlate}
            mileage={car.mileage}
            userRole={user?.role}
            onEdit={handleEditCar}
            onViewRepairs={handleViewRepairs}
          />
        </>
      )}
    </QueryState>
  );
}
