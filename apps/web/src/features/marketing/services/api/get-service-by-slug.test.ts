import { beforeEach, describe, expect, it, vi } from "vitest";

import { apiClient } from "@/lib";
import { createServiceFixture } from "@/test/fixtures/service.fixture";

import { getServiceBySlug } from "./get-service-by-slug";

vi.mock("@/lib", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockedApiGet = vi.mocked(apiClient.get);

describe("getServiceBySlug", () => {
  beforeEach(() => {
    mockedApiGet.mockReset();
  });

  it("returns a service from a valid API response", async () => {
    const service = createServiceFixture({
      slug: "engine-repair",
    });

    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: "Successfully found service.",
        data: service,
      },
    });

    const result = await getServiceBySlug("engine-repair");

    expect(result).toEqual(service);
  });

  it("trims the service slug before making the request", async () => {
    const service = createServiceFixture({
      slug: "engine-repair",
    });

    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: "Successfully found service.",
        data: service,
      },
    });

    await getServiceBySlug("  engine-repair  ");

    expect(mockedApiGet).toHaveBeenCalledWith("/services/engine-repair", {
      signal: undefined,
    });
  });

  it("passes AbortSignal to apiClient", async () => {
    const abortController = new AbortController();
    const service = createServiceFixture();

    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: "Successfully found service.",
        data: service,
      },
    });

    await getServiceBySlug("diagnostics", {
      signal: abortController.signal,
    });

    expect(mockedApiGet).toHaveBeenCalledWith("/services/diagnostics", {
      signal: abortController.signal,
    });
  });

  it("throws when the service slug is empty", async () => {
    await expect(getServiceBySlug("   ")).rejects.toThrow(
      "Service slug is required!",
    );

    expect(mockedApiGet).not.toHaveBeenCalled();
  });

  it("throws when the API response does not match serviceResponseSchema", async () => {
    mockedApiGet.mockResolvedValue({
      data: {
        status: "200",
        success: true,
        message: "Successfully found service.",
        data: {},
      },
    });

    await expect(getServiceBySlug("diagnostics")).rejects.toThrow();
  });
});
