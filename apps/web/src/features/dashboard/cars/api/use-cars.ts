import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { CarsListQuery } from '@autoservice/contracts';
import { getCars } from './get-cars';
import { getCarById } from './get-car-by-id';
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

export function useCar(carId: string, userId?: string) {
  return useQuery({
    queryKey: carsKeys.detail(carId, userId),
    queryFn: () => getCarById(carId),
    enabled: Boolean(carId && userId),
    staleTime: STALE_TIME_MS,
  });
}
