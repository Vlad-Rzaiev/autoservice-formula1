import { CarsListQuery } from '@autoservice/contracts';

export const carsKeys = {
  all: ['cars'] as const,

  lists: () => [...carsKeys.all, 'list'] as const,

  list: (query: CarsListQuery, userId?: string) =>
    [...carsKeys.lists(), userId, query] as const,
};
