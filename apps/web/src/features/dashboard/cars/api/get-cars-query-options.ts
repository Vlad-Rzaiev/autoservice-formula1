import type { CarsListQuery } from '@autoservice/contracts';

export const carsKeys = {
  all: ['cars'] as const,

  lists: () => [...carsKeys.all, 'list'] as const,

  list: (query: CarsListQuery, userId?: string) =>
    [...carsKeys.lists(), userId, query] as const,

  details: () => [...carsKeys.all, 'detail'] as const,

  detail: (carId: string, userId?: string) =>
    [...carsKeys.details(), userId, carId] as const,
};
