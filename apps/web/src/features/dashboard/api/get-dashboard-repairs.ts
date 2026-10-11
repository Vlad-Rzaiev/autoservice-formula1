import { apiClient } from '@/lib';
import {
  repairListResponseDataSchema,
  type RepairDto,
  type RepairsListResponse,
} from '@autoservice/contracts';

interface GetDashboardRepairsOptions {
  signal?: AbortSignal;
}

export async function getDashboardRepairs({
  signal,
}: GetDashboardRepairsOptions = {}): Promise<RepairDto[]> {
  const response = await apiClient.get<RepairsListResponse>('/repairs', {
    params: {
      page: 1,
      limit: 5,
    },
    signal,
  });

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch dashboard repairs');
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

  return parsedResponse.data.items;
}
