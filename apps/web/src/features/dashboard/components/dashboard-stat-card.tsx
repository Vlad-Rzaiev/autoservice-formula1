import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-bold tracking-tight tabular-nums">
            {value}
          </p>

          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary`}
          >
            <FontAwesomeIcon
              icon={icon}
              aria-hidden="true"
              className="text-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
