import { CircleAlert, RotateCw } from "lucide-react";

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
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex min-h-52 flex-col items-center justify-center
        rounded-2xl border border-destructive/20
        bg-destructive/5 px-6 py-10 text-center
        shadow-sm
        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="
          flex size-14 items-center justify-center
          rounded-2xl border border-destructive/20
          bg-destructive/10 text-destructive
        "
      >
        <CircleAlert className="size-7" strokeWidth={1.8} />
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

      {onRetry && retryLabel && (
        <button
          type="button"
          disabled={isRetrying}
          onClick={onRetry}
          className="
            group mt-6 inline-flex min-h-11 cursor-pointer
            items-center justify-center gap-2 rounded-xl
            bg-red-600 px-5 py-2.5
            text-sm font-semibold text-white
            shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]
            transition-all duration-200
            hover:-translate-y-0.5 hover:bg-red-700
            active:translate-y-0 active:scale-[0.98]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-red-500
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
            disabled:pointer-events-none
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <RotateCw
            aria-hidden="true"
            className={`
              size-4 transition-transform duration-300
              group-hover:rotate-45
              ${isRetrying ? "animate-spin" : ""}
            `}
          />

          {retryLabel}
        </button>
      )}
    </div>
  );
}
