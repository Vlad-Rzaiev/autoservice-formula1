import {
  clientListResponseSchema,
  type ClientListResponseData,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

interface GetClientsOptions {
  page?: number;
  limit?: number;
  search?: string;
  signal?: AbortSignal;
}

export async function getClients({
  page = 1,
  limit = 100,
  search,
  signal,
}: GetClientsOptions = {}): Promise<ClientListResponseData> {
  const response = await apiClient.get<unknown>('/clients', {
    params: { page, limit, search },
    signal,
  });

  const parsedResponse = clientListResponseSchema.parse(response.data);

  return parsedResponse.data;
}
