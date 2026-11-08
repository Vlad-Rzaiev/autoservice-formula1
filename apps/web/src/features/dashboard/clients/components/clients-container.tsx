'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  faMagnifyingGlass,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import type { ClientListQuery } from '@autoservice/contracts';
import { useClients } from '../api/use-clients';
import { Container, Section } from '@/components/layout';
import { QueryState } from '@/components/states';
import ClientsListSkeleton from './clients-list-skeleton';
import ClientsContent from './clients-content';
import ClientsSearch from './clients-search';
import ClientsStatCards from './clients-stat-cards';

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function ClientsContainer() {
  const t = useTranslations('clients');

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

  const query: ClientListQuery = {
    page,
    limit: PAGE_SIZE,
    ...(search ? { search } : {}),
  };

  const { data, isPending, isError, isFetching, refetch } = useClients(query);

  const pagination = data?.pagination;

  return (
    <Section className="mt-4">
      <Container className="space-y-6">
        <div className="flex flex-col gap-5">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t('title')}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {t('description')}
            </p>
          </div>

          <ClientsStatCards
            total={data?.pagination.totalItems ?? 0}
            verified={data?.stats.verified}
            unverified={data?.stats.unverified}
            isLoading={isPending}
          />

          <ClientsSearch
            value={searchInput}
            onChange={setSearchInput}
            placeholder={t('search.placeholder')}
          />
        </div>

        <QueryState
          isPending={isPending}
          isError={isError}
          isEmpty={Boolean(data && data.items.length === 0)}
          loadingMessage={t('loading-state.loading-title')}
          loadingDescription={t('loading-state.loading-description')}
          loadingContent={<ClientsListSkeleton />}
          errorMessage={t('loading-state.error-title')}
          errorDescription={t('loading-state.error-description')}
          retryLabel={t('loading-state.retry')}
          isRetrying={isFetching}
          onRetry={() => void refetch()}
          emptyMessage={
            search
              ? t('loading-state.no-results-title')
              : t('loading-state.empty-title')
          }
          emptyDescription={
            search
              ? t('loading-state.no-results-description')
              : t('loading-state.empty-description')
          }
          emptyIcon={search ? faMagnifyingGlass : faScrewdriverWrench}
        >
          {data && data.items.length > 0 && (
            <ClientsContent
              clients={data.items}
              pagination={pagination}
              isFetching={isFetching}
              onPrevious={() => setPage((current) => Math.max(1, current - 1))}
              onNext={() =>
                setPage((current) =>
                  Math.min(pagination?.totalPages ?? 1, current + 1),
                )
              }
            />
          )}
        </QueryState>
      </Container>
    </Section>
  );
}
