"use client";

import { useQuery } from "@tanstack/react-query";
import {
  serviceBySlugQueryOptions,
  servicesQueryOptions,
  selectActiveServices,
  selectFeaturedServices,
} from "@/features/marketing/services";

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
