'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import { Link, usePathname } from '@/i18n/navigation';
import { dashboardNavigation } from '../config/dashboard-navigation';
import { BrandLogo } from '@/components/common';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { LogoutButton } from '@/features/auth';
import { LangSwitcher } from '@/components/locale';
import { ThemeSwitcher } from '@/components/theme';
import { getUserInitials } from '../config/get-user-initials';

export interface DashboardSidebarProps {
  onNavigate?: () => void;
}

export default function DashboardSidebar({
  onNavigate,
}: DashboardSidebarProps) {
  const t = useTranslations('dashboard');
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const visibleNavigation = dashboardNavigation.filter((item) =>
    item.roles.includes(user.role),
  );

  const initials = getUserInitials(user.firstName, user.lastName, user.email);

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  const isNavigationItemActive = (href: string): boolean =>
    pathname === href ||
    (href !== '/dashboard' && pathname.startsWith(`${href}/`));

  return (
    <aside className="flex h-dvh w-72 shrink-0 flex-col border-r bg-background">
      <div className="flex h-18 items-center border-b px-6">
        <BrandLogo />
      </div>

      <nav
        aria-label={t('navigation.title')}
        className="flex-1 overflow-y-auto px-3 py-6"
      >
        <ul className="space-y-1">
          {visibleNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isNavigationItemActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="size-4 shrink-0" />

                <span>{t(`navigation.${item.labelKey}`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar size="sm">
            {user.photo && <AvatarImage src={user.photo} alt={displayName} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2">
          <LangSwitcher />

          <ThemeSwitcher />
        </div>

        <LogoutButton />
      </div>
    </aside>
  );
}
