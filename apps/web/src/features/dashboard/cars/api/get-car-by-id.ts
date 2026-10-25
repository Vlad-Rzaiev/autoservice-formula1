import { apiClient } from '@/lib';
import { carResponseSchema, type CarDto } from '@autoservice/contracts';

export async function getCarById(carId: string): Promise<CarDto> {
  const response = await apiClient.get<unknown>(`/cars/${carId}`);
  const parsedResponse = carResponseSchema.parse(response.data);

  return parsedResponse.data;
}
