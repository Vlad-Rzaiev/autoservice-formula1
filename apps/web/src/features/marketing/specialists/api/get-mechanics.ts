import {
  mechanicsResponseSchema,
  type MechanicDto,
} from '@autoservice/contracts';

import { apiClient } from '@/lib';

interface GetMechanicsOptions {
  signal?: AbortSignal;
}

export async function getMechanics(
  options: GetMechanicsOptions = {},
): Promise<MechanicDto[]> {
  const response = await apiClient.get<unknown>('/mechanics', {
    signal: options.signal,
  });

  const parsedResponse = mechanicsResponseSchema.parse(response.data);

  const mechanics: MechanicDto[] = parsedResponse.data;

  return mechanics;
}
