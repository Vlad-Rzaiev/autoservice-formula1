import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import type { CarListPagination } from '@autoservice/contracts';
import { Button } from '@/components/ui/button';
import type { CarsPaginationLabels } from '../../config/cars-list.types';

interface CarsPaginationProps {
  pagination: CarListPagination;
  labels: CarsPaginationLabels;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CarsPagination({
  pagination,
  labels,
  isFetching,
  onPrevious,
  onNext,
}: CarsPaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{labels.showing}</p>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground">{labels.page}</p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1 || isFetching}
            onClick={onPrevious}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              aria-hidden="true"
              className="size-3"
            />
            {labels.previous}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.totalPages || isFetching}
            onClick={onNext}
          >
            {labels.next}
            <FontAwesomeIcon
              icon={faChevronRight}
              aria-hidden="true"
              className="size-3"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
