import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  title: string;
  description?: string;
  className?: string;
}

export default function LoadingState({
  title,
  description,
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-10 flex min-h-52 flex-col items-center justify-center gap-4",
        "rounded-2xl border border-border",
        "bg-surface/60 px-6 py-10 text-center shadow-sm",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="
          relative flex size-14 items-center justify-center
          rounded-2xl border border-red-500/20
          bg-red-500/10 text-red-600
        "
      >
        <span
          className="
            absolute inset-0 animate-ping rounded-2xl
            bg-red-500/10
            motion-reduce:animate-none
          "
        />

        <FontAwesomeIcon
          icon={faSpinner}
          className="
            relative shrink-0 text-2xl
            animate-spin
            motion-reduce:animate-none
          "
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
