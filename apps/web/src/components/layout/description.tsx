export interface DescriptionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function Description({
  eyebrow,
  title,
  description,
}: DescriptionProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-success">
          {eyebrow}
        </span>
      )}

      {title && (
        <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {title}
        </h3>
      )}

      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
