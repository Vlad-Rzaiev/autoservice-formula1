'use client';

import { useEffect, useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

import { Button } from '@/components/ui';

import { CompletedWorkDto } from '@autoservice/contracts';
import { useCompletedWorks } from '../api/use-completed-works';
import CompletedWorkSlide from './completed-work-slide';
import { QueryState } from '@/components/states';
import CompletedWorkSlideSkeleton from './completed-work-slide-skeleton';

type CompletedWorksRefetch = ReturnType<typeof useCompletedWorks>['refetch'];

export interface CompletedWorksCatalogProps {
  completedWorks: CompletedWorkDto[];
  isPending: boolean;
  isError: boolean;
  isRefetching: boolean;
  refetch: CompletedWorksRefetch;
}

export default function CompletedWorksCatalog({
  completedWorks,
  isPending,
  isError,
  isRefetching,
  refetch,
}: CompletedWorksCatalogProps) {
  const t = useTranslations('marketing.completed-works');

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentIndex = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCurrentIndex();

    carouselApi.on('select', updateCurrentIndex);

    return () => {
      carouselApi.off('select', updateCurrentIndex);
    };
  }, [carouselApi]);

  return (
    <QueryState
      isPending={isPending}
      isError={isError}
      isEmpty={completedWorks.length === 0}
      loadingContent={<CompletedWorkSlideSkeleton />}
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
      <div className="relative">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {completedWorks.map((completedWork) => (
              <CarouselItem key={completedWork._id}>
                <CompletedWorkSlide completedWork={completedWork} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => carouselApi?.scrollPrev()}
            aria-label={t('actions.previous')}
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>

          <div className="flex items-center gap-2">
            {completedWorks.map((completedWork, slideIndex) => (
              <button
                key={completedWork._id}
                type="button"
                aria-label={`${t('actions.goToSlide')} ${slideIndex + 1}`}
                aria-current={slideIndex === currentIndex ? 'true' : undefined}
                onClick={() => carouselApi?.scrollTo(slideIndex)}
                className={
                  slideIndex === currentIndex
                    ? 'h-2.5 w-7 rounded-full bg-primary'
                    : 'h-2.5 w-2.5 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50'
                }
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => carouselApi?.scrollNext()}
            aria-label={t('actions.next')}
            className="cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </QueryState>
  );
}
