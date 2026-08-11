import { beforeEach, describe, expect, it, vi } from "vitest";

import { createServiceFixture } from "@/test/fixtures/service.fixture";

import { getServiceOr404 } from "./get-service-or-404";

const serviceMock = vi.hoisted(() => ({
  getServiceBySlug: vi.fn(),
  isApiNotFoundError: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/features/marketing/services", () => ({
  getServiceBySlug: serviceMock.getServiceBySlug,
}));

vi.mock("@/lib", () => ({
  isApiNotFoundError: serviceMock.isApiNotFoundError,
}));

vi.mock("next/navigation", () => ({
  notFound: serviceMock.notFound,
}));

describe("getServiceOr404", () => {
  beforeEach(() => {
    serviceMock.getServiceBySlug.mockReset();
    serviceMock.isApiNotFoundError.mockReset();
    serviceMock.notFound.mockClear();
  });

  it("returns the service when it exists", async () => {
    const service = createServiceFixture({
      slug: "engine-repair",
    });

    serviceMock.getServiceBySlug.mockResolvedValue(service);

    const result = await getServiceOr404("engine-repair");

    expect(result).toEqual(service);

    expect(serviceMock.getServiceBySlug).toHaveBeenCalledWith("engine-repair");
  });

  it("trims the slug before requesting the service", async () => {
    const service = createServiceFixture();

    serviceMock.getServiceBySlug.mockResolvedValue(service);

    await getServiceOr404("  diagnostics  ");

    expect(serviceMock.getServiceBySlug).toHaveBeenCalledWith("diagnostics");
  });

  it("calls notFound for an empty slug", async () => {
    await expect(getServiceOr404("   ")).rejects.toThrow("NEXT_NOT_FOUND");

    expect(serviceMock.getServiceBySlug).not.toHaveBeenCalled();
  });

  it("calls notFound when the API reports SERVICE_NOT_FOUND", async () => {
    const apiError = new Error("Service request failed");

    serviceMock.getServiceBySlug.mockRejectedValue(apiError);

    serviceMock.isApiNotFoundError.mockReturnValue(true);

    await expect(getServiceOr404("missing-service")).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );

    expect(serviceMock.isApiNotFoundError).toHaveBeenCalledWith(apiError);

    expect(serviceMock.notFound).toHaveBeenCalledTimes(1);
  });

  it("rethrows errors that are not SERVICE_NOT_FOUND", async () => {
    const apiError = new Error("Internal server error");

    serviceMock.getServiceBySlug.mockRejectedValue(apiError);

    serviceMock.isApiNotFoundError.mockReturnValue(false);

    await expect(getServiceOr404("engine-repair-error")).rejects.toBe(apiError);

    expect(serviceMock.notFound).not.toHaveBeenCalled();
  });
});
