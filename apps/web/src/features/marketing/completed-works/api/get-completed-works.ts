import {
  completedWorksResponseSchema,
  type CompletedWorkDto,
} from '@autoservice/contracts';

import { apiClient } from '@/lib';

interface GetCompletedWorksOption {
  signal?: AbortSignal;
}

export async function getCompletedWorks(
  options: GetCompletedWorksOption = {},
): Promise<CompletedWorkDto[]> {
  const response = await apiClient.get<unknown>('/completed-works', {
    signal: options.signal,
  });

  const parsedResponse = completedWorksResponseSchema.parse(response.data);

  const completedWorks: CompletedWorkDto[] = parsedResponse.data;

  return completedWorks;
}
