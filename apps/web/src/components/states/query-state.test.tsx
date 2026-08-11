import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import QueryState from "./query-state";

vi.mock("@/components/states", () => ({
  LoadingState: ({ title }: { title: string }) => (
    <div data-testid="loading-state">{title}</div>
  ),

  ErrorState: ({
    title,
    retryLabel,
    onRetry,
  }: {
    title: string;
    retryLabel?: string;
    onRetry?: () => void;
  }) => (
    <div data-testid="error-state">
      <span>{title}</span>

      {onRetry && retryLabel ? (
        <button type="button" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  ),

  EmptyState: ({ title }: { title: string }) => (
    <div data-testid="empty-state">{title}</div>
  ),
}));

const defaultProps = {
  isPending: false,
  isError: false,
  isEmpty: false,
  loadingMessage: "Loading...",
  errorMessage: "Error",
  emptyMessage: "Nothing found",
};

describe("QueryState", () => {
  it("renders LoadingState when pending", () => {
    render(
      <QueryState {...defaultProps} isPending>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("renders ErrorState when an error occurs", () => {
    render(
      <QueryState {...defaultProps} isError>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByTestId("error-state")).toBeInTheDocument();
  });

  it("renders EmptyState when the result is empty", () => {
    render(
      <QueryState {...defaultProps} isEmpty>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders children when there is no special state", () => {
    render(
      <QueryState {...defaultProps}>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("gives pending state priority over error state", () => {
    render(
      <QueryState {...defaultProps} isPending isError>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
  });

  it("gives error state priority over empty state", () => {
    render(
      <QueryState {...defaultProps} isError isEmpty>
        <div>Content</div>
      </QueryState>,
    );

    expect(screen.getByTestId("error-state")).toBeInTheDocument();

    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("calls onRetry when retry is clicked", () => {
    const handleRetry = vi.fn();

    render(
      <QueryState
        {...defaultProps}
        isError
        retryLabel="Try again"
        onRetry={handleRetry}
      >
        <div>Content</div>
      </QueryState>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Try again",
      }),
    );

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
