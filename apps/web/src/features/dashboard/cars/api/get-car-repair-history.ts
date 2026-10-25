import { apiClient } from '@/lib';
import {
  repairListResponseDataSchema,
  type RepairDto,
  type RepairsListResponse,
} from '@autoservice/contracts';

interface GetCarRepairHistoryOptions {
  carId: string;
  signal?: AbortSignal;
}

export async function getCarRepairHistory({
  carId,
  signal,
}: GetCarRepairHistoryOptions): Promise<RepairDto[]> {
  const response = await apiClient.get<RepairsListResponse>('/repairs', {
    params: {
      carId,
      page: 1,
      limit: 10,
    },
    signal,
  });

  if (!response.data.success || !('data' in response.data)) {
    throw new Error('Failed to fetch car repair history');
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
