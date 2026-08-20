import type { CompletedWorkDto } from '@autoservice/contracts';

function selectCompletedWorksBySortOrder(
  firstCompletedWork: CompletedWorkDto,
  secondCompletedWork: CompletedWorkDto,
): number {
  return firstCompletedWork.sortOrder - secondCompletedWork.sortOrder;
}

export function selectActiveCompletedWorks(
  completedWorks: CompletedWorkDto[],
): CompletedWorkDto[] {
  return completedWorks
    .filter((completedWork) => completedWork.isActive)
    .sort(selectCompletedWorksBySortOrder);
}

export function selectFeaturesCompletedWorks(
  completedWorks: CompletedWorkDto[],
): CompletedWorkDto[] {
  return completedWorks
    .filter((completedWork) => completedWork.featured && completedWork.isActive)
    .sort(selectCompletedWorksBySortOrder);
}
