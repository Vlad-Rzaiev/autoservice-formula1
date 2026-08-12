'use client';

import { useQuery } from '@tanstack/react-query';
import {
  serviceBySlugQueryOptions,
  servicesQueryOptions,
} from './services-query-options';

import {
  selectActiveServices,
  selectFeaturedServices,
} from '../model/service.selectors';

export function useServices() {
  return useQuery({
    ...servicesQueryOptions,
    select: selectActiveServices,
  });
}

export function useFeaturedServices() {
  return useQuery({
    ...servicesQueryOptions,
    select: selectFeaturedServices,
  });
}

export function useServiceBySlug(serviceSlug: string) {
  return useQuery(serviceBySlugQueryOptions(serviceSlug));
}
