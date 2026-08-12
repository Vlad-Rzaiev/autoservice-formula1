import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components/ui';
import { StateShell } from '@/components/states';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconDefinition;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon = faInbox,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const hasAction = Boolean(actionLabel && onAction);

  return (
    <StateShell
      title={title}
      description={description}
      variant="default"
      className={className}
      icon={
        <>
          <span className="absolute inset-2 rounded-xl bg-muted/60" />

          <FontAwesomeIcon icon={icon} className="relative shrink-0 text-2xl" />
        </>
      }
      actions={
        hasAction ? (
          <Button
            type="button"
            variant="outline"
            onClick={onAction}
            className="
              min-h-11 cursor-pointer rounded-xl
              px-5 text-sm font-semibold
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-red-500/40
              hover:bg-red-500/5
              hover:text-red-600
              active:translate-y-0
              active:scale-[0.98]
            "
          >
            {actionLabel}
          </Button>
        ) : undefined
      }
    />
  );
}
