'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';

import { Button } from '@/components/ui';
import { routes } from '@/config';
import { useAuth } from '@/providers/auth-provider';

export default function LogoutButton() {
  const t = useTranslations('dashboard.logout');
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace(`/${currentLocale}${routes.auth.login}`);
  };

  return (
    <Button
      type="button"
      variant="ctaInverse"
      onClick={handleLogout}
      className="cursor-pointer"
    >
      {t('logoutBtn')}
    </Button>
  );
}
