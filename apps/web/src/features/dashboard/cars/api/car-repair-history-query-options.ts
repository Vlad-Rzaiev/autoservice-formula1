import { queryOptions } from '@tanstack/react-query';
import { getCarRepairHistory } from './get-car-repair-history';

export const carRepairHistoryQueryKeys = {
  all: ['cars', 'repair-history'] as const,

  detail: (carId: string | undefined) =>
    [...carRepairHistoryQueryKeys.all, carId ?? null] as const,
};

export function carRepairHistoryQueryOptions(
  carId: string | undefined,
  userId: string | undefined,
  accessToken: string | null,
) {
  return queryOptions({
    queryKey: carRepairHistoryQueryKeys.detail(carId),
    queryFn: ({ signal }) => {
      if (!carId) {
        throw new Error('Car ID is required');
      }

      return getCarRepairHistory({ carId, signal });
    },
    staleTime: 30_000,
    enabled: Boolean(carId && userId && accessToken),
    retry: false,
  });
}
