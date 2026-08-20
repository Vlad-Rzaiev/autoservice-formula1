import {
  completedWorkResponseSchema,
  type CompletedWorkDto,
} from '@autoservice/contracts';

import { apiClient } from '@/lib';

interface GetCompletedWorkByIdOptions {
  signal?: AbortSignal;
}

export async function getCompletedWorkById(
  completedWorkId: string,
  options: GetCompletedWorkByIdOptions = {},
): Promise<CompletedWorkDto> {
  const normalizeCompletedWorkId = completedWorkId.trim();

  if (!normalizeCompletedWorkId) {
    throw new Error('Completed work ID is required!');
  }

  const response = await apiClient.get<unknown>(
    `/completed-works/${encodeURIComponent(normalizeCompletedWorkId)}`,
    {
      signal: options.signal,
    },
  );

  const parsedResponse = completedWorkResponseSchema.parse(response.data);

  const completedWork = parsedResponse.data;

  return completedWork;
}
