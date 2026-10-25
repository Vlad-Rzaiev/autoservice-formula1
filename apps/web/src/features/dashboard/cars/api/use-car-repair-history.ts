import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers';
import { carRepairHistoryQueryOptions } from './car-repair-history-query-options';

export function useCarRepairHistory(carId: string) {
  const { user, accessToken } = useAuth();

  return useQuery(
    carRepairHistoryQueryOptions(carId, user?.userId, accessToken),
  );
}
