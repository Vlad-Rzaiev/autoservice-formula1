import { Skeleton } from '@/components/ui';

export default function ServiceCardSkeleton() {
  return (
    <div className="flex h-67.25 flex-col rounded-2xl border p-6">
      <Skeleton className="size-12 rounded-xl" />

      <div className="mt-5 space-y-3">
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <Skeleton className="mt-auto h-10 w-32 rounded-xl" />
    </div>
  );
}
