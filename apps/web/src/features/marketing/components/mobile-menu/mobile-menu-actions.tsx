'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { routes } from '@/config';
import { ButtonLink } from '@/components/common';

export interface MobileMenuActionsProps {
  onNavigate: () => void;
}

export default function MobileMenuActions({
  onNavigate,
}: MobileMenuActionsProps) {
  const t = useTranslations();

  return (
    <div className="mt-auto flex flex-col gap-3">
      <ButtonLink href="/#booking" onClick={onNavigate} fullWidth>
        <FontAwesomeIcon
          icon={faCalendarCheck}
          aria-hidden="true"
          className="text-xl shrink-0"
        />
        {t('marketing.header.actions.booking')}
      </ButtonLink>

      <ButtonLink
        href={routes.auth.login}
        onClick={onNavigate}
        fullWidth
        variant="ctaOutline"
      >
        <FontAwesomeIcon
          icon={faRightToBracket}
          aria-hidden="true"
          className="text-xl shrink-0"
        />
        {t('marketing.header.actions.account')}
      </ButtonLink>

      <div className="flex items-center justify-center">
        <p className="text-center text-sm text-foreground/55">
          {t('mobile-menu.noAccount')}
        </p>
        <ButtonLink
          href={routes.auth.register}
          className="underline"
          onClick={onNavigate}
          variant="subtle"
          size="compact"
        >
          {t('auth.reg.regBtn')}
        </ButtonLink>
      </div>
    </div>
  );
}
