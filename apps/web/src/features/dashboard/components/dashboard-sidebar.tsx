'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import { Link, usePathname } from '@/i18n/navigation';
import {
  dashboardNavigation,
  type DashboardNavItem,
} from '../config/dashboard-navigation';
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

  const [manuallyExpandedItems, setManuallyExpandedItems] = useState<string[]>(
    [],
  );

  const activeParentItems = dashboardNavigation
    .filter((item) =>
      item.children?.some(
        (child) =>
          pathname === child.href || pathname.startsWith(`${child.href}/`),
      ),
    )
    .map((item) => item.href);

  const expandedItems = [
    ...new Set([...manuallyExpandedItems, ...activeParentItems]),
  ];

  if (!user) {
    return null;
  }

  const toggleExpanded = (href: string) => {
    if (activeParentItems.includes(href)) {
      return;
    }

    setManuallyExpandedItems((current) =>
      current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href],
    );
  };

  const filterNavigation = (items: DashboardNavItem[]): DashboardNavItem[] =>
    items
      .filter((item) => item.roles.includes(user.role))
      .map((item) => ({
        ...item,
        children: item.children ? filterNavigation(item.children) : undefined,
      }));

  const visibleNavigation = filterNavigation(dashboardNavigation);

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
              <div className="flex items-center gap-1">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`flex h-11 min-w-0 flex-1 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                    isNavigationItemActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />

                  <span className="truncate">
                    {t(`navigation.${item.labelKey}`)}
                  </span>
                </Link>

                {item.children && item.children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.href)}
                    aria-expanded={expandedItems.includes(item.href)}
                    aria-label={
                      expandedItems.includes(item.href)
                        ? `Collapse ${t(`navigation.${item.labelKey}`)}`
                        : `Expand ${t(`navigation.${item.labelKey}`)}`
                    }
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={
                        expandedItems.includes(item.href)
                          ? faChevronDown
                          : faChevronRight
                      }
                      className="size-3"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {item.children &&
                item.children.length > 0 &&
                expandedItems.includes(item.href) && (
                  <ul className="ml-5 mt-1 space-y-1 border-l border-border pl-3">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;

                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onNavigate}
                            aria-current={isChildActive ? 'page' : undefined}
                            className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isChildActive
                                ? 'bg-primary font-medium text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={child.icon}
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />

                            <span className="truncate">
                              {t(`navigation.${child.labelKey}`)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
