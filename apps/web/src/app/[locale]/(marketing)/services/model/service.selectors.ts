import type { Service } from "@/app/[locale]/(marketing)/services/model/service.types";

function compareServicesBySortOrder(
  firstService: Service,
  secondService: Service,
): number {
  return firstService.sortOrder - secondService.sortOrder;
}

export function selectActiveServices(services: Service[]): Service[] {
  return services
    .filter((service) => service.isActive)
    .sort(compareServicesBySortOrder);
}

export function selectFeaturedServices(services: Service[]): Service[] {
  return services
    .filter((service) => service.isActive && service.featured)
    .sort(compareServicesBySortOrder);
}
