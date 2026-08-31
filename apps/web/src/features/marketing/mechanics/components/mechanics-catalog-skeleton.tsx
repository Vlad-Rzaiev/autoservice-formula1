import { CardGrid } from '@/components/common';

import MechanicCardSkeleton from './mechanic-card-skeleton';

const SERVICE_SKELETON_COUNT = 3;

export default function MechanicCatalogSkeleton() {
  return (
    <CardGrid columns="three" gap="large">
      {Array.from({ length: SERVICE_SKELETON_COUNT }, (_, index) => (
        <MechanicCardSkeleton key={index} />
      ))}
    </CardGrid>
  );
}
