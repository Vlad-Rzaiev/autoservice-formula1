import type { ButtonHTMLAttributes, ReactNode } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LangSwitcher from "./lang-switcher";

const navigationMock = vi.hoisted(() => ({
  currentLocale: "uk",
  pathname: "/services",
  searchParams: new URLSearchParams("category=engine&page=2"),
  replace: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useLocale: () => navigationMock.currentLocale,
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => navigationMock.searchParams,
}));

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => navigationMock.pathname,

  useRouter: () => ({
    replace: navigationMock.replace,
  }),
}));

vi.mock("next/image", () => ({
  default: () => null,
}));

vi.mock("@/components/common", () => ({
  IconButton: ({
    children,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  }) => <button {...props}>{children}</button>,
}));

describe("LangSwitcher", () => {
  beforeEach(() => {
    navigationMock.currentLocale = "uk";
    navigationMock.pathname = "/services";
    navigationMock.searchParams = new URLSearchParams("category=engine&page=2");
    navigationMock.replace.mockReset();
  });

  it("marks the current locale as pressed", () => {
    render(<LangSwitcher />);

    expect(
      screen.getByRole("button", {
        name: "UA",
      }),
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("button", {
        name: "PL",
      }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("does not navigate when the current locale is clicked", async () => {
    const user = userEvent.setup();

    render(<LangSwitcher />);

    await user.click(
      screen.getByRole("button", {
        name: "UA",
      }),
    );

    expect(navigationMock.replace).not.toHaveBeenCalled();
  });

  it("switches to another locale", async () => {
    const user = userEvent.setup();

    render(<LangSwitcher />);

    await user.click(
      screen.getByRole("button", {
        name: "PL",
      }),
    );

    expect(navigationMock.replace).toHaveBeenCalledWith(
      {
        pathname: "/services",
        query: {
          category: "engine",
          page: "2",
        },
      },
      {
        locale: "pl",
        scroll: false,
      },
    );
  });

  it("preserves query parameters when changing locale", async () => {
    const user = userEvent.setup();

    navigationMock.searchParams = new URLSearchParams(
      "category=engine&page=2&sort=asc",
    );

    render(<LangSwitcher />);

    await user.click(
      screen.getByRole("button", {
        name: "EN",
      }),
    );

    expect(navigationMock.replace).toHaveBeenCalledWith(
      {
        pathname: "/services",
        query: {
          category: "engine",
          page: "2",
          sort: "asc",
        },
      },
      {
        locale: "en",
        scroll: false,
      },
    );
  });
});
