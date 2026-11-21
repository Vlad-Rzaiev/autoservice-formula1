import { apiClient } from '@/lib';
import {
  appointmentsListResponseSchema,
  type AppointmentListResponseData,
  type AppointmentsListQuery,
} from '@autoservice/contracts';

export async function getAppointments(
  query: AppointmentsListQuery,
): Promise<AppointmentListResponseData> {
  const response = await apiClient.get<unknown>('/appointments', {
    params: query,
  });
  const parsedResponse = appointmentsListResponseSchema.parse(response.data);

  return parsedResponse.data;
}
