import {
  appointmentResponseSchema,
  type AppointmentDto,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

export async function getAppointmentById(
  appointmentId: string,
): Promise<AppointmentDto> {
  const response = await apiClient.get<unknown>(
    `/appointments/${appointmentId}`,
  );
  const parsedResponse = appointmentResponseSchema.parse(response.data);

  return parsedResponse.data;
}
