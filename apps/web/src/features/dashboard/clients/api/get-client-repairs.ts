import { apiClient } from '@/lib';
import {
  repairListResponseDataSchema,
  type RepairListResponseData,
  type RepairsListResponse,
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
}: GetClientRepairsOptions): Promise<RepairListResponseData> {
  const response = await apiClient.get<RepairsListResponse>('/repairs', {
    params: { clientId, page, limit },
    signal,
  });

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch client repairs');
  }

  const parsedResponse = repairListResponseDataSchema.safeParse(
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
