import type { AppointmentsListQuery } from '@autoservice/contracts';

export const appointmentsKeys = {
  all: ['appointments'] as const,

  lists: () => [...appointmentsKeys.all, 'list'] as const,

  list: (query: AppointmentsListQuery, userId?: string) =>
    [...appointmentsKeys.lists(), userId, query] as const,

  details: () => [...appointmentsKeys.all, 'detail'] as const,

  detail: (appointmentId: string, userId?: string) =>
    [...appointmentsKeys.details(), userId, appointmentId] as const,
};
