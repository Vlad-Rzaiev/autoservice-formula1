import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { AppointmentsListQuery } from '@autoservice/contracts';
import { appointmentsKeys } from './appointments.keys';
import { getAppointments } from './get-appointments';
import { getAppointmentById } from './get-appointment-by-id';
import { STALE_TIME_MS } from '@/features/marketing/lib';

export function useAppointments(query: AppointmentsListQuery, userId: string) {
  return useQuery({
    queryKey: appointmentsKeys.list(query, userId),
    queryFn: () => getAppointments(query),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });
}

export function useAppointment(appointmentId: string, userId: string) {
  return useQuery({
    queryKey: appointmentsKeys.detail(appointmentId, userId),
    queryFn: () => getAppointmentById(appointmentId),
    enabled: Boolean(appointmentId && userId),
    staleTime: STALE_TIME_MS,
  });
}
