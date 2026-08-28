import { CardGrid } from '@/components/common';

import ServiceCardSkeleton from './service-card-skeleton';

const SERVICE_SKELETON_COUNT = 6;

export default function ServicesCatalogSkeleton() {
  return (
    <CardGrid columns="three" gap="large">
      {Array.from({ length: SERVICE_SKELETON_COUNT }, (_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </CardGrid>
  );
}
