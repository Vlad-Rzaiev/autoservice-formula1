import { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

import { LoadingState } from "@/components";
import { ErrorState } from "@/components";
import { EmptyState } from "@/components";

export interface QueryStateProps {
  isPending: boolean;
  isError: boolean;
  isEmpty?: boolean;
  loadingMessage: string;
  loadingDescription?: string;
  errorMessage: string;
  errorDescription?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  emptyIcon?: IconDefinition;
  retryLabel: string;
  actionLabel?: string;
  onRetry?: () => void;
  onAction?: () => void;
  isRetrying?: boolean;
  loadingClassName?: string;
  errorClassName?: string;
  emptyClassName?: string;
  children: ReactNode;
}

export default function QueryState({
  isPending,
  isError,
  isEmpty = false,
  loadingMessage,
  loadingDescription,
  errorMessage,
  errorDescription,
  emptyMessage,
  emptyDescription,
  retryLabel,
  actionLabel,
  emptyIcon = faInbox,
  onRetry,
  onAction,
  isRetrying = false,
  loadingClassName,
  errorClassName,
  emptyClassName,
  children,
}: QueryStateProps) {
  if (isPending) {
    return (
      <LoadingState
        title={loadingMessage}
        description={loadingDescription}
        className={loadingClassName}
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title={errorMessage}
        description={errorDescription}
        retryLabel={retryLabel}
        onRetry={onRetry}
        isRetrying={isRetrying}
        className={errorClassName}
      />
    );
  }

  if (isEmpty && emptyMessage) {
    return (
      <EmptyState
        title={emptyMessage}
        description={emptyDescription}
        actionLabel={actionLabel}
        onAction={onAction}
        className={emptyClassName}
        icon={emptyIcon}
      />
    );
  }

  return children;
}
