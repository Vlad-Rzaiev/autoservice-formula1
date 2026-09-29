import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGaugeHigh,
  faGear,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '@autoservice/contracts';
import { routes } from '@/config';

export interface DashboardNavItem {
  href: string;
  labelKey: string;
  icon: IconDefinition;
  roles: UserRole[];
}

export const dashboardNavigation: DashboardNavItem[] = [
  {
    href: routes.dashboard.home,
    labelKey: 'dashboard',
    icon: faGaugeHigh,
    roles: ['owner', 'manager', 'mechanic', 'client'],
  },
  {
    href: routes.dashboard.clients.list,
    labelKey: 'clients',
    icon: faUsers,
    roles: ['owner', 'manager'],
  },
  {
    href: routes.dashboard.profile,
    labelKey: 'profile',
    icon: faUser,
    roles: ['owner', 'manager', 'mechanic', 'client'],
  },
  {
    href: routes.dashboard.settings,
    labelKey: 'settings',
    icon: faGear,
    roles: ['owner', 'manager', 'mechanic', 'client'],
  },
];
