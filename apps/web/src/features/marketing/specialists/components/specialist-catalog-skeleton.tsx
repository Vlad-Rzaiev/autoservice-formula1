import { CardGrid } from '@/components/common';

import SpecialistCardSkeleton from './specialist-card-skeleton';

const SERVICE_SKELETON_COUNT = 3;

export default function SpecialistCatalogSkeleton() {
  return (
    <CardGrid columns="three" gap="large">
      {Array.from({ length: SERVICE_SKELETON_COUNT }, (_, index) => (
        <SpecialistCardSkeleton key={index} />
      ))}
    </CardGrid>
  );
}
