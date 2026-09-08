import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config';

function ContactsMap() {
  const t = useTranslations('marketing.contacts.map');

  return (
    <div className="relative min-h-105 overflow-hidden rounded-2xl border">
      <iframe
        src={siteConfig.embedUrl}
        title={t('title')}
        loading="lazy"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}

export { ContactsMap };
