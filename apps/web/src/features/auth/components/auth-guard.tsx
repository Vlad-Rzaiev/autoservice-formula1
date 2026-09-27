'use client';

import React, { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { useAuth } from '@/providers';
import { routes } from '@/config';

export interface AuthGuardProps {
  children?: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  const { isAuthenticated, isLoading, isLoggingOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoggingOut) {
      window.location.replace(
        `/${currentLocale}${routes.auth.login}?message=auth-required`,
      );
    }
  }, [isAuthenticated, isLoading, isLoggingOut, currentLocale]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}

export { AuthGuard };
