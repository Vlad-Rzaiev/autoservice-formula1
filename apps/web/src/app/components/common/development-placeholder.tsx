import SectionTitle from "@/app/components/layout/section-title";
import ButtonLink from "@/app/components/common/buttons/button-link/button-link";

export interface DevelopmentPlaceholderProps {
  title?: string;
  slug?: string;
  description?: string;
  linkText?: string;
  linkHref: string;
}

export default function DevelopmentPlaceholder({
  title,
  slug,
  description,
  linkText,
  linkHref,
}: DevelopmentPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {title && <SectionTitle>{title}</SectionTitle>}

      {slug && <p className="text-2xl mt-4">ID {slug}</p>}

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
