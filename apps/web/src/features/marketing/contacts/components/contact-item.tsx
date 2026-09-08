import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ContactItemProps {
  icon: IconDefinition;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const content = (
    <div className="flex gap-4 items-center">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group block"
    >
      {content}
    </a>
  );
}

export { ContactItem };
