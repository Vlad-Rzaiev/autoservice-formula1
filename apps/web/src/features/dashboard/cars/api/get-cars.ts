import {
  carsListResponseSchema,
  type CarsListQuery,
  type CarListResponseData,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

export async function getCars(
  query: CarsListQuery,
): Promise<CarListResponseData> {
  const response = await apiClient.get<unknown>('/cars', { params: query });
  const parsedResponse = carsListResponseSchema.parse(response.data);

  return parsedResponse.data;
}
