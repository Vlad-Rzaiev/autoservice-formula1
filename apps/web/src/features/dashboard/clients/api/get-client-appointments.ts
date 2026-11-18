import { apiClient } from '@/lib';
import {
  appointmentListResponseDataSchema,
  type AppointmentListResponseData,
  type AppointmentListResponse,
} from '@autoservice/contracts';

interface GetClientAppointmentsOptions {
  clientId: string;
  page: number;
  limit: number;
  signal?: AbortSignal;
}

export async function getClientAppointments({
  clientId,
  page,
  limit,
  signal,
}: GetClientAppointmentsOptions): Promise<AppointmentListResponseData> {
  const response = await apiClient.get<AppointmentListResponse>(
    '/appointments',
    {
      params: { clientId, page, limit },
      signal,
    },
  );

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch client appointments');
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

  return parsedResponse.data;
}
