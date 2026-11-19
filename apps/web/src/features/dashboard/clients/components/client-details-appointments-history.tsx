'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { AppointmentDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { StatusBadge } from '@/components/common';
import { useClientAppointments } from '../api/use-client-appointments';
import { HistoryPagination } from './history-pagination';

interface ClientAppointmentsHistoryProps {
  clientId: string;
}

export default function ClientAppointmentsHistory({
  clientId,
}: ClientAppointmentsHistoryProps) {
  const t = useTranslations('clients.client-page.history');
  const locale = useLocale();

  const [paginationState, setPaginationState] = useState({
    clientId,
    page: 1,
  });

  const appointmentsPage =
    paginationState.clientId === clientId ? paginationState.page : 1;

  const appointmentsQuery = {
    clientId,
    page: appointmentsPage,
    limit: 10,
  };

  const {
    data: appointments,
    isPending: isAppointmentsPending,
    isError: isAppointmentsError,
    isFetching: isAppointmentsFetching,
  } = useClientAppointments(appointmentsQuery);

  const handleAppointmentsPageChange = (page: number) => {
    setPaginationState({
      clientId,
      page,
    });
  };

  const appointmentStatusLabels: Record<AppointmentDto['status'], string> = {
    pending: t('status.pending'),
    confirmed: t('status.confirmed'),
    in_progress: t('status.in_progress'),
    completed: t('status.completed'),
    cancelled: t('status.cancelled'),
    no_show: t('status.no_show'),
  };

  const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const appointmentItems: AppointmentDto[] = appointments?.items ?? [];

  return (
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
        ) : isAppointmentsError && !appointments ? (
          <p className="text-sm text-destructive">{t('appointments.error')}</p>
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

                    <StatusBadge
                      status={appointment.status}
                      label={appointmentStatusLabels[appointment.status]}
                    />
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
  );
}
