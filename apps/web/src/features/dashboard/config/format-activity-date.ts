import { AppointmentDto, RepairDto } from '@autoservice/contracts';

export function formatActivityDate(value: string, locale: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function getActivityDate(
  kind: 'appointments' | 'repairs',
  item: AppointmentDto | RepairDto,
): string {
  if (kind === 'appointments' && 'scheduledStart' in item) {
    return item.scheduledStart;
  }

  if (kind === 'repairs' && 'createdAt' in item) {
    return item.createdAt;
  }

  throw new Error('Unexpected activity item type');
}
