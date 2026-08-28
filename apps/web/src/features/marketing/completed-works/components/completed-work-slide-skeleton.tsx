import { Skeleton } from '@/components/ui';
import { Card, CardContent } from '@/components/ui';

export default function CompletedWorkSlideSkeleton() {
  return (
    <Card className="overflow-hidden border p-0 shadow-none">
      <CardContent className="p-0">
        <div className="space-y-6 p-4 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-8 w-2/3 sm:w-1/2" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-5">
              <Skeleton className="mb-3 h-3 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <Skeleton className="mb-3 h-3 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>

          <div className="border-t pt-5">
            <Skeleton className="mb-3 h-3 w-16" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
