import { z } from "zod";

import { createApiResponseSchema } from "../common/api-response.schema.js";
import { serviceDtoSchema } from "../services/service.schemas.js";

export const servicesResponseSchema = createApiResponseSchema(
  z.array(serviceDtoSchema),
);

export const serviceResponseSchema = createApiResponseSchema(serviceDtoSchema);
