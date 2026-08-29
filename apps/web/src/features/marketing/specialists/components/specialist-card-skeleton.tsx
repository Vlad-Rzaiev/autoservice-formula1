import {
  Card,
  CardContent,
  CardFooter,
  Separator,
  Skeleton,
} from '@/components/ui';

export default function SpecialistCardSkeleton() {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="px-4">
        <Skeleton className="aspect-4/3 rounded-3xl border-4 border-muted" />
      </div>

      <CardContent>
        <Skeleton className="h-6 w-2/3" />

        <Skeleton className="mt-2 h-4 w-1/2" />

        <Separator className="my-4" />

        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-sm" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="mt-4">
          <Skeleton className="mb-2 h-3 w-28" />

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="ml-auto h-10 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
