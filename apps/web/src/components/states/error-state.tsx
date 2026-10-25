import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleExclamation,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { StateShell } from '@/components/states';

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
        <span
          className="
            flex size-14 shrink-0 items-center justify-center
            rounded-2xl border border-red-500/15
            bg-red-500/10 text-red-600
            dark:text-red-400
          "
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            aria-hidden="true"
            className="text-2xl"
          />
        </span>
      }
      actions={
        hasRetryAction ? (
          <Button
            type="button"
            disabled={isRetrying}
            onClick={onRetry}
            className="
              min-h-11 cursor-pointer gap-2.5 rounded-xl
              px-5 py-2.5 text-sm font-semibold
              shadow-sm transition-colors duration-200
              focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              disabled:pointer-events-none disabled:opacity-60
            "
          >
            <FontAwesomeIcon
              icon={faRotateRight}
              aria-hidden="true"
              className={cn('size-3.5', isRetrying && 'animate-spin')}
            />

            {retryLabel}
          </Button>
        ) : undefined
      }
    />
  );
}
