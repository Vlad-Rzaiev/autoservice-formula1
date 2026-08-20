'use client';

import { useQuery } from '@tanstack/react-query';
import {
  selectActiveCompletedWorks,
  selectFeaturesCompletedWorks,
} from '../model/completed-works.selectors';
import {
  completedWorkByIdQueryOptions,
  completedWorksQueryOptions,
} from './completed-works-query-options';

export function useCompletedWorks() {
  return useQuery({
    ...completedWorksQueryOptions,
    select: selectActiveCompletedWorks,
  });
}

export function useFeaturesCompletedWorks() {
  return useQuery({
    ...completedWorksQueryOptions,
    select: selectFeaturesCompletedWorks,
  });
}

export function useCompletedWorkById(completedWorkId: string) {
  return useQuery(completedWorkByIdQueryOptions(completedWorkId));
}
