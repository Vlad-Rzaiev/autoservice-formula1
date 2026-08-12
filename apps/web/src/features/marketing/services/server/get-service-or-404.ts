import { cache } from 'react';
import { notFound } from 'next/navigation';
import type { ServiceDto } from '@autoservice/contracts';
import { getServiceBySlug } from '@/features/marketing/services';
import { isApiNotFoundError } from '@/lib';

export const getServiceOr404 = cache(
  async (slug: string): Promise<ServiceDto> => {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      notFound();
    }

    try {
      const service = await getServiceBySlug(normalizedSlug);

      return service;
    } catch (err: unknown) {
      if (isApiNotFoundError(err)) {
        notFound();
      }

      throw err;
    }
  },
);
