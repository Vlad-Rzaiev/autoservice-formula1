import { ButtonLink } from '@/components/common';
import { SectionTitle } from '@/components/layout';

export interface DevelopmentPlaceholderProps {
  title?: string;
  id?: string;
  description?: string;
  linkText?: string;
  linkHref: string;
}

export default function DevelopmentPlaceholder({
  title,
  id,
  description,
  linkText,
  linkHref,
}: DevelopmentPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {title && <SectionTitle>{title}</SectionTitle>}

      {id && <p className="text-2xl mt-4">ID {id}</p>}

      {description && (
        <p
          className="
            my-5 max-w-2xl text-center
            text-lg leading-8 text-muted-foreground
            sm:text-xl sm:leading-9
        "
        >
          {description}
        </p>
      )}

      {linkHref && linkText && (
        <ButtonLink href={linkHref}>{linkText}</ButtonLink>
      )}
    </div>
  );
}
