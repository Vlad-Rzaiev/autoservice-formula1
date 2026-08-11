import type { ReactNode } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ServiceCard from "./service-card";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/common", () => ({
  IconCard: ({
    title,
    description,
    footer,
  }: {
    title: string;
    description: string;
    footer?: ReactNode;
  }) => (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      {footer}
    </article>
  ),
}));

describe("ServiceCard", () => {
  it("renders the service title", () => {
    render(
      <ServiceCard
        slug="engine-repair"
        icon="settings"
        title="Engine repair"
        description="Engine repair description"
        actionLabel="Details"
      />,
    );

    expect(screen.getByText("Engine repair")).toBeInTheDocument();
  });

  it("renders the service description", () => {
    render(
      <ServiceCard
        slug="engine-repair"
        icon="settings"
        title="Engine repair"
        description="Engine repair description"
        actionLabel="Details"
      />,
    );

    expect(screen.getByText("Engine repair description")).toBeInTheDocument();
  });

  it("renders the action label", () => {
    render(
      <ServiceCard
        slug="engine-repair"
        icon="settings"
        title="Engine repair"
        description="Engine repair description"
        actionLabel="Details"
      />,
    );

    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  it("links to the service details page", () => {
    render(
      <ServiceCard
        slug="engine-repair"
        icon="settings"
        title="Engine repair"
        description="Engine repair description"
        actionLabel="Details"
      />,
    );

    const serviceLink = screen.getByRole("link");

    expect(serviceLink).toHaveAttribute("href", "/services/engine-repair");
  });
});
