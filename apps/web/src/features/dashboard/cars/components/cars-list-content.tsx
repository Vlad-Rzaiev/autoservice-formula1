import type { CarDto, CarListPagination } from '@autoservice/contracts';
import CarCard from './car-card';
import CarsPagination from './cars-pagination';
import CarsTable from './cars-table';
import type {
  CarsListLabels,
  CarsPaginationLabels,
} from '../../config/cars-list.types';

interface CarsListContentProps {
  cars: CarDto[];
  labels: CarsListLabels;
  pagination?: CarListPagination;
  paginationLabels: CarsPaginationLabels;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CarsListContent({
  cars,
  labels,
  pagination,
  paginationLabels,
  isFetching,
  onPrevious,
  onNext,
}: CarsListContentProps) {
  return (
    <div className="space-y-4">
      <CarsTable cars={cars} labels={labels} />

      <div className="space-y-3 md:hidden">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} labels={labels} />
        ))}
      </div>

      {pagination && pagination.totalItems > 0 && (
        <CarsPagination
          pagination={pagination}
          labels={paginationLabels}
          isFetching={isFetching}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}
    </div>
  );
}
