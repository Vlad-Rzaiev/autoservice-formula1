import type { AppointmentDto, RepairDto } from '@autoservice/contracts';
import { Badge, type badgeVariants } from '@/components/ui/badge';
import type { VariantProps } from 'class-variance-authority';

type StatusBadgeStatus = RepairDto['status'] | AppointmentDto['status'];

type StatusBadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>['variant']
>;

interface StatusBadgeProps {
  status: StatusBadgeStatus;
  label: string;
}

const statusVariants: Record<StatusBadgeStatus, StatusBadgeVariant> = {
  pending: 'warning',
  accepted: 'info',
  confirmed: 'info',
  in_progress: 'progress',
  waiting_parts: 'attention',
  awaiting_approval: 'approval',
  completed: 'success',
  cancelled: 'danger',
  no_show: 'danger',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return <Badge variant={statusVariants[status]}>{label}</Badge>;
}
