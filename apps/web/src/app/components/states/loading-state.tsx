import { LoaderCircle } from "lucide-react";

export interface LoadingStateProps {
  title: string;
  description?: string;
  className?: string;
}

export default function LoadingState({
  title,
  description,
  className = "",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface/60 px-6 py-10 text-center shadow-sm ${className}`}
    >
      <div
        aria-hidden="true"
        className="relative flex size-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10"
      >
        <span className="absolute inset-0 animate-ping rounded-2xl bg-red-500/10" />

        <LoaderCircle
          className="relative size-7 animate-spin text-red-600 dark:text-red-400"
          strokeWidth={1.8}
        />
      </div>

      <div>
        <p className="text-base font-medium text-foreground">{title}</p>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <span className="sr-only">{title}</span>
    </div>
  );
}
