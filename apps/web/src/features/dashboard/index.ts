export { dashboardNavigation } from './config/dashboard-navigation';

export type { DashboardNavItem } from './config/dashboard-navigation';

export { default as DashboardSidebar } from './components/dashboard-sidebar';
export { default as DashboardShell } from './components/dashboard-shell';
export { default as DashboardHeader } from './components/dashboard-header';
export { default as DashboardMobileNav } from './components/dashboard-mobile-nav';
export { default as DashboardStatCard } from './components/dashboard-stat-card';

export { getUserInitials } from './config/get-user-initials';

export { useDashboardSummary } from './api/use-dashboard-summary';

export { default as DashboardStatsSkeleton } from './components/dashboard-stats-skeleton';
export { default as DashboardOverview } from './components/dashboard-overview';
export { default as DashboardQuickActions } from './components/dashboard-quick-actions';

export { default as DashboardRecentActivity } from './components/dashboard-recent-activity';

export { useDashboardActivity } from './api/use-dashboard-activity';

export { default as CreateCarForm } from './cars/components/create-car-form';

export { getCars } from './cars/api/get-cars';
export { useCars } from './cars/api/use-cars';

export type {
  CarsPaginationLabels,
  CarsListLabels,
} from './config/cars-list.types.ts';

export { default as CarsListContent } from './cars/components/cars-list-content';
export { default as CarsListSkeleton } from './cars/components/cars-list-skeleton';
export { default as CarsSearch } from './cars/components/cars-search';
export { default as CarsStatCards } from './cars/components/cars-stat-cards';
export { default as CarDetails } from './cars/components/car-details';
