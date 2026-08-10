import { describe, expect, it } from "vitest";
import { apiErrorSchema } from "./api-error.schema.js";

describe("apiErrorSchema", () => {
  it("accepts a valid API error", () => {
    const result = apiErrorSchema.safeParse({
      status: 404,
      success: false,
      code: "HTTP_404",
      message: "Service not found.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects success true", () => {
    const result = apiErrorSchema.safeParse({
      status: 404,
      success: true,
      code: "HTTP_404",
      message: "Service not found.",
    });

    expect(result.success).toBe(false);
  });

  it("accepts an API error with details", () => {
    const result = apiErrorSchema.safeParse({
      status: 400,
      success: false,
      code: "HTTP_400",
      message: "Invalid request body.",
      details: {
        fieldErrors: {
          slug: ["Invalid slug."],
        },
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts an API error with requestId", () => {
    const result = apiErrorSchema.safeParse({
      status: 500,
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      requestId: "9e679766-9f4a-46cc-91cb-b711593e43df",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a numeric requestId", () => {
    const result = apiErrorSchema.safeParse({
      status: 500,
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      requestId: 12345,
    });

    expect(result.success).toBe(false);
  });
});
