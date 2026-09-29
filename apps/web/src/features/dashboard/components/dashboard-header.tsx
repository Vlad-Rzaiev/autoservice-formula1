'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import DashboardMobileNav from './dashboard-mobile-nav';
import { getUserInitials } from '../config/get-user-initials';

export default function DashboardHeader() {
  const t = useTranslations('dashboard');
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  const initials = getUserInitials(user.firstName, user.lastName, user.email);

  return (
    <header className="flex h-18 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 navigation:px-6">
      <div className="flex items-center gap-3">
        <DashboardMobileNav />

        <div className="hidden navigation:block">
          <p className="text-sm font-medium">{t('header.title')}</p>
          <p className="text-xs text-muted-foreground">
            {t('header.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar size="sm">
          {user.photo && <AvatarImage src={user.photo} alt={displayName} />}

          <AvatarFallback>
            {initials || (
              <FontAwesomeIcon icon={faUserCircle} aria-hidden="true" />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="hidden max-w-48 min-[640px]:block">
          <p className="truncate text-sm font-medium">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </header>
  );
}
