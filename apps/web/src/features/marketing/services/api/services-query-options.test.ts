import { describe, expect, it } from "vitest";

import {
  serviceBySlugQueryOptions,
  servicesQueryKeys,
  servicesQueryOptions,
} from "./services-query-options";

describe("servicesQueryKeys", () => {
  it("creates the services root key", () => {
    expect(servicesQueryKeys.all).toEqual(["services"]);
  });

  it("creates the services list key", () => {
    expect(servicesQueryKeys.list()).toEqual(["services", "list", "all"]);
  });

  it("creates a detail key containing the service slug", () => {
    expect(servicesQueryKeys.detail("engine-repair")).toEqual([
      "services",
      "detail",
      "engine-repair",
    ]);
  });
});

describe("servicesQueryOptions", () => {
  it("uses the services list query key", () => {
    expect(servicesQueryOptions.queryKey).toEqual(["services", "list", "all"]);
  });
});

describe("serviceBySlugQueryOptions", () => {
  it("enables the query when serviceSlug is provided", () => {
    const options = serviceBySlugQueryOptions("engine-repair");

    expect(options.enabled).toBe(true);
  });

  it("disables the query when serviceSlug is empty", () => {
    const options = serviceBySlugQueryOptions("");

    expect(options.enabled).toBe(false);
  });

  it("uses the service slug in the query key", () => {
    const options = serviceBySlugQueryOptions("engine-repair");

    expect(options.queryKey).toEqual(["services", "detail", "engine-repair"]);
  });
});
