import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Card, CardContent } from '@/components/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: IconDefinition;
}

export default function DashboardStatCard({
  label,
  value,
  icon,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FontAwesomeIcon icon={icon} className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight mb-2">{value}</p>
          <p className="truncate text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
