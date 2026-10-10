import { Card, CardContent, Skeleton } from '@/components/ui';

const DASHBOARD_STATS_COUNT = 4;

export default function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: DASHBOARD_STATS_COUNT }, (_, index) => (
        <Card key={index}>
          <CardContent className="flex items-center gap-4">
            <Skeleton className="size-11 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1">
              <Skeleton className="mb-2 h-8 w-16" />
              <Skeleton className="h-4 w-28 max-w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
