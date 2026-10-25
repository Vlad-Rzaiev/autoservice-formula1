import { Container, Section } from '@/components/layout';
import { Skeleton } from '@/components/ui';

export default function CarDetailsSkeleton() {
  return (
    <>
      <Section className="mt-4">
        <Container>
          <div className="relative border-b border-border pb-6">
            <Skeleton className="mb-3 h-4 w-36" />

            <Skeleton className="h-10 w-3/4 max-w-lg sm:h-12 lg:h-14" />

            <div className="absolute bottom-0 left-0 h-1 w-16 rounded-full bg-primary" />
          </div>
        </Container>
      </Section>

      <Section noTopPadding>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Skeleton className="aspect-4/3 w-full rounded-2xl sm:aspect-video" />

              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="aspect-4/3 w-full rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col py-1 lg:py-3">
              <Skeleton className="h-9 w-4/5 max-w-sm sm:h-11" />

              <Skeleton className="mt-2 h-6 w-20" />

              <Skeleton className="mt-5 h-11 w-44 rounded-lg" />

              <div className="my-6 h-1 w-14 rounded-full bg-primary" />

              <div className="space-y-5">
                {Array.from({ length: 5 }, (_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[20px_minmax(0,1fr)] items-center gap-x-3 gap-y-1 sm:grid-cols-[20px_minmax(0,1fr)_auto]"
                  >
                    <Skeleton className="size-4 rounded-sm" />

                    <Skeleton className="h-4 w-20" />

                    <Skeleton className="col-start-2 h-5 w-32 max-w-full sm:col-start-3 sm:w-28" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
