import { MechanicDto } from '@autoservice/contracts';

function selectMechanicsBySortOrder(
  firstMechanic: MechanicDto,
  secondMechanic: MechanicDto,
): number {
  return firstMechanic.sortOrder - secondMechanic.sortOrder;
}

export function selectActiveMechanics(mechanics: MechanicDto[]): MechanicDto[] {
  return mechanics
    .filter((mechanic) => mechanic.isActive)
    .sort(selectMechanicsBySortOrder);
}

export function selectFeaturedMechanics(
  mechanics: MechanicDto[],
): MechanicDto[] {
  return mechanics
    .filter((mechanic) => mechanic.featured && mechanic.isActive)
    .sort(selectMechanicsBySortOrder);
}
