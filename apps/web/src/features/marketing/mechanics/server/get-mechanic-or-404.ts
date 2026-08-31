import { isApiNotFoundError } from '@/lib';
import { getMechanicById } from '../api/get-mechanic-by-id';
import { MechanicDto } from '@autoservice/contracts';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const getMechanicOr404 = cache(
  async (id: string): Promise<MechanicDto> => {
    const normalizedId = id.trim();

    if (!normalizedId) {
      notFound();
    }

    try {
      const mechanic = await getMechanicById(normalizedId);

      return mechanic;
    } catch (error: unknown) {
      if (isApiNotFoundError(error)) {
        notFound();
      }

      throw error;
    }
  },
);
