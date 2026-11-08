import { Skeleton } from '@/components/ui';

const SKELETON_ROWS = 5;

export default function ClientsListSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card xl:block">
        <div className="border-b border-border px-4 py-3">
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_0.8fr_1fr_40px] items-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-20" />
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.5fr_1.5fr_1fr_0.8fr_1fr_40px] items-center gap-4 px-4 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-28 max-w-full" />
              </div>

              <Skeleton className="h-4 w-36 max-w-full" />

              <Skeleton className="h-4 w-24 max-w-full" />

              <Skeleton className="h-4 w-16" />

              <Skeleton className="h-6 w-24 rounded-full" />

              <Skeleton className="size-9 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:hidden">
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <div
            key={index}
            className="min-w-0 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28 max-w-full" />
                <Skeleton className="h-3 w-40 max-w-full" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-24 max-w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="size-9 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
