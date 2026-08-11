import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createServiceFixture } from "@/test/fixtures/service.fixture";

import ServicesCatalog from "./services-catalog";

const localeMock = vi.hoisted(() => ({
  currentLocale: "uk",
}));

vi.mock("next-intl", () => ({
  useLocale: () => localeMock.currentLocale,

  useTranslations: () => {
    return (translationKey: string): string => translationKey;
  },
}));

vi.mock("@/components/states", () => ({
  QueryState: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("./service-card", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <li>
      <h2>{title}</h2>
      <p>{description}</p>
    </li>
  ),
}));

vi.mock("@/components/common", () => ({
  CardGrid: ({ children }: { children: ReactNode }) => (
    <ul data-testid="card-grid">{children}</ul>
  ),
}));

const refetch = vi.fn();

describe("ServicesCatalog", () => {
  beforeEach(() => {
    localeMock.currentLocale = "uk";
    refetch.mockReset();
  });

  it("renders Ukrainian translation for uk locale", () => {
    const service = createServiceFixture();

    render(
      <ServicesCatalog
        services={[service]}
        isPending={false}
        isError={false}
        isRefetching={false}
        refetch={refetch}
      />,
    );

    expect(screen.getByText("Діагностика")).toBeInTheDocument();

    expect(screen.getByText("Опис діагностики")).toBeInTheDocument();
  });

  it("renders Polish translation for pl locale", () => {
    localeMock.currentLocale = "pl";

    const service = createServiceFixture();

    render(
      <ServicesCatalog
        services={[service]}
        isPending={false}
        isError={false}
        isRefetching={false}
        refetch={refetch}
      />,
    );

    expect(screen.getByText("Diagnostyka")).toBeInTheDocument();

    expect(screen.getByText("Opis diagnostyki")).toBeInTheDocument();
  });

  it("renders English translation for en locale", () => {
    localeMock.currentLocale = "en";

    const service = createServiceFixture();

    render(
      <ServicesCatalog
        services={[service]}
        isPending={false}
        isError={false}
        isRefetching={false}
        refetch={refetch}
      />,
    );

    expect(screen.getByText("Diagnostics")).toBeInTheDocument();

    expect(screen.getByText("Diagnostics description")).toBeInTheDocument();
  });

  it("falls back to the default locale for an unsupported locale", () => {
    localeMock.currentLocale = "de";

    const service = createServiceFixture();

    render(
      <ServicesCatalog
        services={[service]}
        isPending={false}
        isError={false}
        isRefetching={false}
        refetch={refetch}
      />,
    );

    expect(screen.getByText("Diagnostyka")).toBeInTheDocument();
  });
});
