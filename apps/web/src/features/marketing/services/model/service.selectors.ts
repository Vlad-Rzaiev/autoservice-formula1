import type { ServiceDto } from '@autoservice/contracts';

function selectServicesBySortOrder(
  firstService: ServiceDto,
  secondService: ServiceDto,
): number {
  return firstService.sortOrder - secondService.sortOrder;
}

export function selectActiveServices(services: ServiceDto[]): ServiceDto[] {
  return services
    .filter((service) => service.isActive)
    .sort(selectServicesBySortOrder);
}

export function selectFeaturedServices(services: ServiceDto[]): ServiceDto[] {
  return services
    .filter((service) => service.isActive && service.featured)
    .sort(selectServicesBySortOrder);
}
