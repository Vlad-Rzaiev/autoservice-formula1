'use client';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { routes } from '@/config';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { useAuth } from '@/providers/auth-provider';

export default function LogoutButton() {
  const t = useTranslations('dashboard.logout');
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.replace(`/${currentLocale}${routes.auth.login}`);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
    >
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        aria-hidden="true"
        className="size-4"
      />

      <span>{t('logoutBtn')}</span>
    </Button>
  );
}
