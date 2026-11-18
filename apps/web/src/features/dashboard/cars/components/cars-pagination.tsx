import type { CarListPagination } from '@autoservice/contracts';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import type { CarsPaginationLabels } from '../../config/cars-list.types';

interface CarsPaginationProps {
  pagination: CarListPagination;
  labels: CarsPaginationLabels;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

type PaginationPage = number | 'ellipsis';

export default function CarsPagination({
  pagination,
  labels,
  isFetching,
  onPrevious,
  onNext,
  onPageChange,
}: CarsPaginationProps) {
  const { page: currentPage, totalPages } = pagination;

  const getVisiblePages = (): PaginationPage[] => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, pageIndex) => pageIndex + 1,
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ];
  };

  const getCompactVisiblePages = (): PaginationPage[] => {
    if (totalPages <= 3) {
      return Array.from(
        { length: totalPages },
        (_, pageIndex) => pageIndex + 1,
      );
    }

    if (currentPage <= 2) {
      return [1, 2, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 1) {
      return [1, 'ellipsis', totalPages - 1, totalPages];
    }

    return [1, 'ellipsis', currentPage, 'ellipsis', totalPages];
  };

  const renderPageItems = (
    pages: PaginationPage[],
    variant: 'compact' | 'regular',
  ) =>
    pages.map((page, pageIndex) => (
      <PaginationItem key={`${variant}-${pageIndex}`}>
        {page === 'ellipsis' ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            isActive={currentPage === page}
            aria-label={`Go to page ${page}`}
            aria-disabled={isFetching}
            tabIndex={isFetching ? -1 : 0}
            onClick={(event) => {
              event.preventDefault();

              if (!isFetching && currentPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-muted-foreground sm:text-left">
        {labels.showing}
      </p>

      <Pagination className="mx-0 w-auto justify-center sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text=""
              aria-disabled={currentPage <= 1 || isFetching}
              tabIndex={currentPage <= 1 || isFetching ? -1 : 0}
              onClick={(event) => {
                event.preventDefault();

                if (currentPage > 1 && !isFetching) {
                  onPrevious();
                }
              }}
            />
          </PaginationItem>

          <div className="contents min-[381px]:hidden">
            {renderPageItems(getCompactVisiblePages(), 'compact')}
          </div>

          <div className="contents max-[380px]:hidden">
            {renderPageItems(getVisiblePages(), 'regular')}
          </div>

          <PaginationItem>
            <PaginationNext
              text=""
              aria-disabled={currentPage >= totalPages || isFetching}
              tabIndex={currentPage >= totalPages || isFetching ? -1 : 0}
              onClick={(event) => {
                event.preventDefault();

                if (currentPage < totalPages && !isFetching) {
                  onNext();
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
