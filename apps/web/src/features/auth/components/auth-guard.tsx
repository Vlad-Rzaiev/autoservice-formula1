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

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.replace(
        `/${currentLocale}${routes.auth.login}?message=auth-required`,
      );
    }
  }, [isAuthenticated, isLoading, currentLocale]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
}

export { AuthGuard };
