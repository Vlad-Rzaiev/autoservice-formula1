import {
  carResponseSchema,
  type CarDto,
  type CreateCarInput,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

export async function createCar(payload: CreateCarInput): Promise<CarDto> {
  const response = await apiClient.post<unknown>('/cars', payload);
  const parsedResponse = carResponseSchema.parse(response.data);

  return parsedResponse.data;
}
