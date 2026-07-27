import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "my-10 flex min-h-52 flex-col items-center justify-center",
        "rounded-2xl border border-dashed border-border",
        "bg-surface/50 px-6 py-10 text-center",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="
          relative flex size-14 items-center justify-center
          rounded-2xl border border-border
          bg-background text-muted-foreground
          shadow-sm
        "
      >
        <span className="absolute inset-2 rounded-xl bg-muted/60" />

        <FontAwesomeIcon icon={icon} className="relative shrink-0 text-2xl" />
      </div>

      <div className="mt-4 max-w-lg">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </p>

        {description && (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <Button
          type="button"
          variant="outline"
          onClick={onAction}
          className="
            mt-6 min-h-11 cursor-pointer rounded-xl
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
      )}
    </div>
  );
}
