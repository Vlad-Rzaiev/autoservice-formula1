import { apiClient } from '@/lib';
import {
  appointmentListResponseDataSchema,
  type AppointmentDto,
  type AppointmentListResponse,
} from '@autoservice/contracts';

interface GetDashboardAppointmentsOptions {
  signal?: AbortSignal;
}

export async function getDashboardAppointments({
  signal,
}: GetDashboardAppointmentsOptions = {}): Promise<AppointmentDto[]> {
  const response = await apiClient.get<AppointmentListResponse>(
    '/appointments',
    {
      params: {
        page: 1,
        limit: 5,
      },
      signal,
    },
  );

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch dashboard appointments');
  }

  const parsedResponse = appointmentListResponseDataSchema.safeParse(
    response.data.data,
  );

  if (!parsedResponse.success) {
    console.error(
      'Validation issues:',
      JSON.stringify(parsedResponse.error.issues, null, 2),
    );

    throw parsedResponse.error;
  }

  return parsedResponse.data.items;
}
