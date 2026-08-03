import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { StateShell } from "@/components/states";

export interface ErrorStateProps {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export default function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  isRetrying = false,
  className,
}: ErrorStateProps) {
  const hasRetryAction = Boolean(onRetry && retryLabel);

  return (
    <StateShell
      title={title}
      description={description}
      variant="error"
      className={className}
      icon={
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="shrink-0 text-2xl"
        />
      }
      actions={
        hasRetryAction ? (
          <Button
            type="button"
            disabled={isRetrying}
            onClick={onRetry}
            className="
              group min-h-11 cursor-pointer rounded-xl
              bg-red-600 px-5 py-2.5
              text-sm font-semibold text-white
              shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:bg-red-700
              active:translate-y-0 active:scale-[0.98]
              focus-visible:ring-red-500
              focus-visible:ring-offset-background
              disabled:pointer-events-none
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FontAwesomeIcon
              icon={faRotateRight}
              aria-hidden="true"
              className={cn(
                "shrink-0 text-base transition-transform duration-300",
                !isRetrying && "group-hover:rotate-45",
                isRetrying && "animate-spin",
              )}
            />

            {retryLabel}
          </Button>
        ) : undefined
      }
    />
  );
}
