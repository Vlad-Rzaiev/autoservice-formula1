import { MechanicDto, mechanicResponseSchema } from '@autoservice/contracts';

import { apiClient } from '@/lib';

interface GetMechanicByIdOptions {
  signal?: AbortSignal;
}

export async function getMechanicById(
  mechanicId: string,
  options: GetMechanicByIdOptions = {},
): Promise<MechanicDto> {
  const normalizedMechanicId = mechanicId.trim();

  if (!normalizedMechanicId) {
    throw new Error('Mechanic ID is required!');
  }

  const response = await apiClient.get<unknown>(
    `/mechanics/${encodeURIComponent(normalizedMechanicId)}`,
    {
      signal: options.signal,
    },
  );

  const parsedResponse = mechanicResponseSchema.parse(response.data);

  const mechanic = parsedResponse.data;

  return mechanic;
}
