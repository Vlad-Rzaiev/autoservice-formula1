import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex min-h-52 flex-col items-center justify-center
        rounded-2xl border border-dashed border-border
        bg-surface/50 px-6 py-10 text-center
        ${className}
      `}
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

        <Icon className="relative size-7" strokeWidth={1.7} />
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
        <button
          type="button"
          onClick={onAction}
          className="
            mt-6 inline-flex min-h-11 cursor-pointer
            items-center justify-center rounded-xl
            border border-border bg-background
            px-5 py-2.5 text-sm font-semibold text-foreground
            shadow-sm transition-all duration-200
            hover:-translate-y-0.5
            hover:border-red-500/40
            hover:bg-red-500/5
            hover:text-red-600
            active:translate-y-0 active:scale-[0.98]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-red-500
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
