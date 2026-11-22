import { apiClient } from '@/lib';
import {
  clientRepairHistoryResponseDataSchema,
  type ClientRepairHistoryResponse,
  type ClientRepairHistoryResponseData,
} from '@autoservice/contracts';

interface GetClientRepairsOptions {
  clientId: string;
  page: number;
  limit: number;
  signal?: AbortSignal;
}

export async function getClientRepairs({
  clientId,
  page,
  limit,
  signal,
}: GetClientRepairsOptions): Promise<ClientRepairHistoryResponseData> {
  const response = await apiClient.get<ClientRepairHistoryResponse>(
    `/repairs/clients/${clientId}/history`,
    {
      params: { page, limit },
      signal,
    },
  );

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch client repairs');
  }

  const parsedResponse = clientRepairHistoryResponseDataSchema.safeParse(
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
