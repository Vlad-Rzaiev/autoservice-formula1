import { Skeleton } from '@/components/ui/skeleton';

interface CarsListSkeletonProps {
  loadingLabel: string;
}

export default function CarsListSkeleton({
  loadingLabel,
}: CarsListSkeletonProps) {
  return (
    <div role="status" className="space-y-3">
      <span className="sr-only">{loadingLabel}</span>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-xl border border-border p-4"
          >
            <Skeleton className="size-14 shrink-0 rounded-lg" />

            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-xl border border-border md:block">
        <div className="grid grid-cols-5 gap-4 border-b border-border bg-muted/40 p-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center gap-4 border-b border-border p-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 shrink-0 rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
