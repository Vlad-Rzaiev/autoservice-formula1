'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  faMagnifyingGlass,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import type { CarsListQuery } from '@autoservice/contracts';
import {
  useCars,
  CarsListContent,
  CarsListSkeleton,
  CarsSearch,
  type CarsListLabels,
  type CarsPaginationLabels,
} from '@/features/dashboard';
import { useAuth } from '@/providers';
import { Section, Container } from '@/components/layout';
import { QueryState } from '@/components/states';

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function AllCarsPage() {
  const t = useTranslations('dashboard.cars.list');
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const query: CarsListQuery = {
    page,
    limit: PAGE_SIZE,
    ...(search ? { search } : {}),
  };

  const { data, isPending, isError, isFetching, refetch } = useCars(
    query,
    user?.userId,
  );

  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? 0;

  const from =
    pagination && totalItems > 0
      ? (pagination.page - 1) * pagination.limit + 1
      : 0;

  const to = pagination
    ? Math.min(pagination.page * pagination.limit, totalItems)
    : 0;

  const listLabels: CarsListLabels = {
    car: t('columns.car'),
    year: t('columns.year'),
    licensePlate: t('columns.license-plate'),
    vin: t('columns.vin'),
    mileage: t('columns.mileage'),
    unknownLicensePlate: t('unknown-license-plate'),
    unknownMileage: t('unknown-mileage'),
    mileageUnit: t('mileage-unit'),
  };

  const paginationLabels: CarsPaginationLabels = {
    showing: t('pagination.showing', {
      from,
      to,
      total: totalItems,
    }),
    page: t('pagination.page', {
      page: pagination?.page ?? page,
      totalPages: pagination?.totalPages ?? 0,
    }),
    previous: t('pagination.previous'),
    next: t('pagination.next'),
  };

  return (
    <Section className="mt-4">
      <Container>
        <div className="space-y-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t('title')}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {t('description')}
              </p>
            </div>

            <CarsSearch
              value={searchInput}
              onChange={setSearchInput}
              placeholder={t('search-placeholder')}
            />
          </div>

          <QueryState
            isPending={isPending}
            isError={isError}
            isEmpty={Boolean(data && data.items.length === 0)}
            loadingMessage={t('loading-title')}
            loadingDescription={t('loading-description')}
            loadingContent={
              <CarsListSkeleton loadingLabel={t('loading-title')} />
            }
            errorMessage={t('error-title')}
            errorDescription={t('error-description')}
            retryLabel={t('retry')}
            isRetrying={isFetching}
            onRetry={() => void refetch()}
            emptyMessage={search ? t('no-results-title') : t('empty-title')}
            emptyDescription={
              search ? t('no-results-description') : t('empty-description')
            }
            emptyIcon={search ? faMagnifyingGlass : faScrewdriverWrench}
          >
            {data && data.items.length > 0 && (
              <CarsListContent
                cars={data.items}
                labels={listLabels}
                pagination={pagination}
                paginationLabels={paginationLabels}
                isFetching={isFetching}
                onPrevious={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                onNext={() => setPage((current) => current + 1)}
              />
            )}
          </QueryState>
        </div>
      </Container>
    </Section>
  );
}
