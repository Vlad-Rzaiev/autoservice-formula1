'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { RepairDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { StatusBadge } from '@/components/common';
import { useClientRepairs } from '../api/use-client-repairs';
import { HistoryPagination } from './history-pagination';

interface ClientRepairsHistoryProps {
  clientId: string;
}

export default function ClientRepairsHistory({
  clientId,
}: ClientRepairsHistoryProps) {
  const t = useTranslations('clients.client-page.history');
  const locale = useLocale();

  const [paginationState, setPaginationState] = useState({
    clientId,
    page: 1,
  });

  const repairsPage =
    paginationState.clientId === clientId ? paginationState.page : 1;

  const repairsQuery = {
    clientId,
    page: repairsPage,
    limit: 10,
  };

  const {
    data: repairs,
    isPending: isRepairsPending,
    isError: isRepairsError,
    isFetching: isRepairsFetching,
  } = useClientRepairs(repairsQuery);

  const handleRepairsPageChange = (page: number) => {
    setPaginationState({
      clientId,
      page,
    });
  };

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  });

  const numberFormatter = new Intl.NumberFormat(locale);

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
  });

  const repairStatusLabels: Record<RepairDto['status'], string> = {
    pending: t('status.pending'),
    accepted: t('status.accepted'),
    in_progress: t('status.in_progress'),
    waiting_parts: t('status.waiting_parts'),
    awaiting_approval: t('status.awaiting_approval'),
    completed: t('status.completed'),
    cancelled: t('status.cancelled'),
  };

  const repairItems = repairs?.items ?? [];

  return (
    <Section noTopPadding>
      <Container>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{t('repairs.title')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('repairs.description')}
          </p>
        </div>

        {isRepairsPending ? (
          <p className="text-sm text-muted-foreground">
            {t('repairs.loading')}
          </p>
        ) : isRepairsError && !repairs ? (
          <p className="text-sm text-destructive">{t('repairs.error')}</p>
        ) : repairItems.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="font-medium">{t('repairs.empty')}</p>
          </div>
        ) : (
          <>
            <div
              className={`space-y-4 transition-opacity ${
                isRepairsFetching ? 'opacity-60' : ''
              }`}
            >
              {repairItems.map((repair) => (
                <article key={repair._id} className="rounded-lg border p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-semibold">{repair.title}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {t('repairs.createdAt')}:{' '}
                        {dateFormatter.format(new Date(repair.createdAt))}
                      </p>
                    </div>

                    <StatusBadge
                      status={repair.status}
                      label={repairStatusLabels[repair.status]}
                    />
                  </div>

                  {repair.description && (
                    <p className="mt-4 text-sm">{repair.description}</p>
                  )}

                  {repair.diagnosis && (
                    <div className="mt-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        {t('repairs.diagnosis')}
                      </p>
                      <p className="mt-1 text-sm">{repair.diagnosis}</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {repair.startedAt && (
                      <span>
                        {t('repairs.startedAt')}:{' '}
                        {dateFormatter.format(new Date(repair.startedAt))}
                      </span>
                    )}

                    {repair.completedAt && (
                      <span>
                        {t('repairs.completedAt')}:{' '}
                        {dateFormatter.format(new Date(repair.completedAt))}
                      </span>
                    )}

                    {repair.mileage != null && (
                      <span>
                        {t('repairs.mileage')}:{' '}
                        {numberFormatter.format(repair.mileage)}{' '}
                        {t('common.km')}
                      </span>
                    )}

                    {repair.finalCost != null && (
                      <span>
                        {t('repairs.finalCost')}:{' '}
                        {currencyFormatter.format(repair.finalCost)}
                      </span>
                    )}

                    {repair.finalCost == null &&
                      repair.estimatedCost != null && (
                        <span>
                          {t('repairs.estimatedCost')}:{' '}
                          {currencyFormatter.format(repair.estimatedCost)}
                        </span>
                      )}
                  </div>

                  {repair.notes && (
                    <div className="mt-4 border-t pt-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        {t('common.notes')}
                      </p>
                      <p className="mt-1 text-sm">{repair.notes}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <HistoryPagination
              page={repairs.pagination.page}
              totalPages={repairs.pagination.totalPages}
              pageLabel={t('repairs.paginationLabel')}
              previousLabel={t('common.previous')}
              nextLabel={t('common.next')}
              onPageChange={handleRepairsPageChange}
            />
          </>
        )}
      </Container>
    </Section>
  );
}
