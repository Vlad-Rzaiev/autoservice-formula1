import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { CarsListQuery } from '@autoservice/contracts';
import { getCars } from './get-cars';
import { carsKeys } from './get-cars-query-options';
import { STALE_TIME_MS } from '@/features/marketing/lib';

export function useCars(query: CarsListQuery, userId?: string) {
  return useQuery({
    queryKey: carsKeys.list(query, userId),
    queryFn: () => getCars(query),
    placeholderData: keepPreviousData,
    staleTime: STALE_TIME_MS,
  });
}
