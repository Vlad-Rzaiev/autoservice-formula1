'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { AppointmentDto, RepairDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { useClientAppointments } from '../api/use-client-appointments';
import { useClientRepairs } from '../api/use-client-repairs';

interface ClientHistoryProps {
  clientId: string;
}

interface HistoryPaginationProps {
  page: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  pageLabel: string;
  onPageChange: (page: number) => void;
}

function HistoryPagination({
  page,
  totalPages,
  previousLabel,
  nextLabel,
  pageLabel,
  onPageChange,
}: HistoryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={pageLabel}
      className="mt-6 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        {previousLabel}
      </button>

      <span className="text-sm text-muted-foreground">
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        {nextLabel}
      </button>
    </nav>
  );
}

export default function ClientHistory({ clientId }: ClientHistoryProps) {
  const t = useTranslations('clients.client-page.history');
  const locale = useLocale();

  const [paginationState, setPaginationState] = useState({
    clientId,
    appointmentsPage: 1,
    repairsPage: 1,
  });

  const appointmentsPage =
    paginationState.clientId === clientId
      ? paginationState.appointmentsPage
      : 1;

  const repairsPage =
    paginationState.clientId === clientId ? paginationState.repairsPage : 1;

  const appointmentsQuery = {
    clientId,
    page: appointmentsPage,
    limit: 10,
  };

  const repairsQuery = {
    clientId,
    page: repairsPage,
    limit: 10,
  };

  const {
    data: appointments,
    isPending: isAppointmentsPending,
    isError: isAppointmentsError,
    isFetching: isAppointmentsFetching,
  } = useClientAppointments(appointmentsQuery);

  const {
    data: repairs,
    isPending: isRepairsPending,
    isError: isRepairsError,
    isFetching: isRepairsFetching,
  } = useClientRepairs(repairsQuery);

  const handleAppointmentsPageChange = (page: number) => {
    setPaginationState((current) => ({
      clientId,
      appointmentsPage: page,
      repairsPage: current.clientId === clientId ? current.repairsPage : 1,
    }));
  };

  const handleRepairsPageChange = (page: number) => {
    setPaginationState((current) => ({
      clientId,
      appointmentsPage:
        current.clientId === clientId ? current.appointmentsPage : 1,
      repairsPage: page,
    }));
  };

  const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  });

  const numberFormatter = new Intl.NumberFormat(locale);

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
  });

  const appointmentStatusLabels: Record<AppointmentDto['status'], string> = {
    pending: t('status.pending'),
    confirmed: t('status.confirmed'),
    in_progress: t('status.in_progress'),
    completed: t('status.completed'),
    cancelled: t('status.cancelled'),
    no_show: t('status.no_show'),
  };

  const repairStatusLabels: Record<RepairDto['status'], string> = {
    pending: t('status.pending'),
    accepted: t('status.accepted'),
    in_progress: t('status.in_progress'),
    waiting_parts: t('status.waiting_parts'),
    awaiting_approval: t('status.awaiting_approval'),
    completed: t('status.completed'),
    cancelled: t('status.cancelled'),
  };
  const getStatusClassName = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'bg-amber-500/10 text-amber-600',
      confirmed: 'bg-blue-500/10 text-blue-600',
      accepted: 'bg-blue-500/10 text-blue-600',
      in_progress: 'bg-sky-500/10 text-sky-600',
      waiting_parts: 'bg-orange-500/10 text-orange-600',
      awaiting_approval: 'bg-violet-500/10 text-violet-600',
      completed: 'bg-emerald-500/10 text-emerald-600',
      cancelled: 'bg-red-500/10 text-red-600',
      no_show: 'bg-red-500/10 text-red-600',
    };

    return statusClasses[status] ?? 'bg-muted text-muted-foreground';
  };

  const appointmentItems: AppointmentDto[] = appointments?.items ?? [];
  const repairItems: RepairDto[] = repairs?.items ?? [];

  return (
    <>
      <Section noTopPadding>
        <Container>
          <div className="space-y-12">
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
            ) : isRepairsError ? (
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

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                            repair.status,
                          )}`}
                        >
                          {repairStatusLabels[repair.status]}
                        </span>
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

                        {repair.mileage !== null && (
                          <span>
                            {t('repairs.mileage')}:{' '}
                            {numberFormatter.format(repair.mileage)}{' '}
                            {t('common.km')}
                          </span>
                        )}

                        {repair.finalCost !== null && (
                          <span>
                            {t('repairs.finalCost')}:{' '}
                            {currencyFormatter.format(repair.finalCost)}
                          </span>
                        )}

                        {repair.finalCost === null &&
                          repair.estimatedCost !== null && (
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
          </div>
        </Container>
      </Section>

      <Section noTopPadding>
        <Container>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{t('appointments.title')}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('appointments.description')}
            </p>
          </div>

          {isAppointmentsPending ? (
            <p className="text-sm text-muted-foreground">
              {t('appointments.loading')}
            </p>
          ) : isAppointmentsError ? (
            <p className="text-sm text-destructive">
              {t('appointments.error')}
            </p>
          ) : appointmentItems.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="font-medium">{t('appointments.empty')}</p>
            </div>
          ) : (
            <>
              <div
                className={`space-y-4 transition-opacity ${
                  isAppointmentsFetching ? 'opacity-60' : ''
                }`}
              >
                {appointmentItems.map((appointment) => (
                  <article
                    key={appointment._id}
                    className="rounded-lg border p-5"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-semibold">{appointment.title}</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {dateTimeFormatter.format(
                            new Date(appointment.scheduledStart),
                          )}
                          {' — '}
                          {dateTimeFormatter.format(
                            new Date(appointment.scheduledEnd),
                          )}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                          appointment.status,
                        )}`}
                      >
                        {appointmentStatusLabels[appointment.status]}
                      </span>
                    </div>

                    {appointment.description && (
                      <p className="mt-4 text-sm">{appointment.description}</p>
                    )}

                    {appointment.notes && (
                      <div className="mt-4 border-t pt-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          {t('common.notes')}
                        </p>
                        <p className="mt-1 text-sm">{appointment.notes}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <HistoryPagination
                page={appointments.pagination.page}
                totalPages={appointments.pagination.totalPages}
                pageLabel={t('appointments.paginationLabel')}
                previousLabel={t('common.previous')}
                nextLabel={t('common.next')}
                onPageChange={handleAppointmentsPageChange}
              />
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
