import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { contactsLinks } from '../../lib';

function SocialLinks() {
  const t = useTranslations('marketing.contacts.messengers');

  return (
    <div>
      <p className="text-sm text-muted-foreground">{t('title')}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {contactsLinks.map((socialLink) => (
          <a
            key={socialLink.label}
            href={socialLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            <FontAwesomeIcon icon={socialLink.icon} />
            <span>{socialLink.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export { SocialLinks };
