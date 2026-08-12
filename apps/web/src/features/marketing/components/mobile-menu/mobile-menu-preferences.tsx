'use client';

import { useTranslations } from 'next-intl';
import { LangSwitcher } from '@/components/locale';
import { ThemeSwitcher } from '@/components/theme';

export default function MobileMenuPreferences({}) {
  const t = useTranslations();

  return (
    <div
      className="
            shrink-0 border-t border-border
            bg-background/90
            px-4 py-3 backdrop-blur-xl
            sm:px-5
          "
    >
      <div className="flex flex-col gap-3">
        <div className="flex min-h-10 items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground/70">
            {t('mobile-menu.language')}
          </p>

          <LangSwitcher />
        </div>

        <div className="flex min-h-10 items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground/70">
            {t('mobile-menu.theme')}
          </p>

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
