import {
  faCalendarCheck,
  faCar,
  faScrewdriverWrench,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { UserRole } from '@autoservice/contracts';
import { routes } from '@/config';

export interface DashboardQuickAction {
  href: string;
  labelKey: string;
  descriptionKey: string;
  icon: IconDefinition;
  roles: UserRole[];
}

export const dashboardQuickActions: DashboardQuickAction[] = [
  {
    href: routes.dashboard.cars.list,
    labelKey: 'cars',
    descriptionKey: 'cars-description',
    icon: faCar,
    roles: ['owner', 'manager', 'client'],
  },
  {
    href: routes.dashboard.appointments.list,
    labelKey: 'appointments',
    descriptionKey: 'appointments-description',
    icon: faCalendarCheck,
    roles: ['owner', 'manager', 'client'],
  },
  {
    href: routes.dashboard.repairs.list,
    labelKey: 'repairs',
    descriptionKey: 'repairs-description',
    icon: faScrewdriverWrench,
    roles: ['owner', 'manager', 'mechanic', 'client'],
  },
  {
    href: routes.dashboard.clients.list,
    labelKey: 'clients',
    descriptionKey: 'clients-description',
    icon: faUsers,
    roles: ['owner', 'manager'],
  },
];
