import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { ContactItem } from './contact-item';
import { WorkingHours } from './working-hours';
import { SocialLinks } from './social-links';
import { ContactsCta } from './contacts-cta';
import { siteConfig } from '@/config';

function ContactsInfo() {
  const t = useTranslations('marketing.contacts');

  return (
    <div className="rounded-2xl border bg-card p-6 lg:p-8">
      <div className="space-y-6">
        <ContactItem
          icon={faLocationDot}
          label={t('address.label')}
          value={siteConfig.address.display}
          href={siteConfig.address.googleMapsUrl}
        />

        <ContactItem
          icon={faPhone}
          label={t('phone.label')}
          value={siteConfig.phone.display}
          href={siteConfig.phone.href}
        />

        <WorkingHours />

        <ContactItem
          icon={faEnvelope}
          label={t('email.label')}
          value={siteConfig.email.display}
          href={siteConfig.email.href}
        />

        <SocialLinks />
      </div>

      <ContactsCta />
    </div>
  );
}

export { ContactsInfo };
