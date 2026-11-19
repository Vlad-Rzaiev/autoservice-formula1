'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface HistoryPaginationProps {
  page: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  pageLabel: string;
  onPageChange: (page: number) => void;
}

export function HistoryPagination({
  page,
  totalPages,
  previousLabel,
  nextLabel,
  pageLabel,
  onPageChange,
}: HistoryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <Pagination aria-label={pageLabel} className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={previousLabel}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={
              isFirstPage ? 'pointer-events-none opacity-40' : undefined
            }
            onClick={(event) => {
              event.preventDefault();

              if (!isFirstPage) {
                onPageChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <span
            aria-current="page"
            className="flex h-9 min-w-9 items-center justify-center px-2 text-sm font-medium"
          >
            {page} / {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            text={nextLabel}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={
              isLastPage ? 'pointer-events-none opacity-40' : undefined
            }
            onClick={(event) => {
              event.preventDefault();

              if (!isLastPage) {
                onPageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
