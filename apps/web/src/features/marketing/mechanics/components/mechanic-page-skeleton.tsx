import { Container, Section } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import React from 'react';

export interface MechanicPageSkeletonProps {
  children?: React.ReactNode;
}

export default function MechanicPageSkeleton({}: MechanicPageSkeletonProps) {
  return (
    <>
      <Section>
        <Container className="relative">
          <Skeleton className="absolute -top-15 h-5 w-32 md:-top-17.5 lg:-top-20" />

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <Skeleton className="min-h-80 rounded-3xl md:min-h-125" />

            <div className="flex flex-col justify-center">
              <Skeleton className="mb-3 h-4 w-24" />

              <Skeleton className="h-12 w-3/4 md:h-14 lg:h-16" />

              <div className="my-5 space-y-3">
                <Skeleton className="h-5 w-full max-w-3xl" />
                <Skeleton className="h-5 w-5/6 max-w-3xl" />
                <Skeleton className="h-5 w-2/3 max-w-3xl" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="size-5 rounded" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Skeleton className="h-12 w-44 rounded-lg" />
          </div>
        </Container>
      </Section>
    </>
  );
}
