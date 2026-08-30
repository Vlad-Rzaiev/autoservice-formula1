'use client';

import { useQuery } from '@tanstack/react-query';
import {
  mechanicByIdQueryOptions,
  mechanicsQueryOptions,
} from './specialists-query-options';
import {
  selectActiveMechanics,
  selectFeaturedMechanics,
} from '../model/mechanics.selectors';

export function useMechanics() {
  return useQuery({
    ...mechanicsQueryOptions,
    select: selectActiveMechanics,
  });
}

export function useFeaturesMechanics() {
  return useQuery({
    ...mechanicsQueryOptions,
    select: selectFeaturedMechanics,
  });
}

export function useMechanicById(mechanicId: string) {
  return useQuery(mechanicByIdQueryOptions(mechanicId));
}
