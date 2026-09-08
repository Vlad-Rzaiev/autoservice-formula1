import { ButtonLink } from '@/components/common';
import { buttonVariants } from '@/components/ui';
import { routes, siteConfig } from '@/config';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';

function ContactsCta() {
  const t = useTranslations('marketing.contacts.cta');

  return (
    <div className="mt-8 border-t pt-6">
      <p className="font-medium">{t('title')}</p>

      <p className="mt-1 text-sm text-muted-foreground">{t('description')}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <ButtonLink href={routes.marketing.booking} size="cta-lg">
          {t('booking')}
        </ButtonLink>

        <a
          href={siteConfig.phone.href}
          className={cn(
            buttonVariants({ variant: 'ctaInverse', size: 'cta-lg' }),
          )}
        >
          <FontAwesomeIcon
            className="text-sm shrink-0 animate-phone-ring motion-reduce:animate-none"
            icon={faPhoneVolume}
            aria-hidden="true"
          />
          <span>{t('phone')}</span>
        </a>
      </div>
    </div>
  );
}

export { ContactsCta };
