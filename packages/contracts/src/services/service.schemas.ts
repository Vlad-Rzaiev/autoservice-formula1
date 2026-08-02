import { z } from "zod";

import { supportedLocales } from "../common/locale.js";
import { serviceCategories, serviceIconKeys } from "./service.constants.js";
import type { ServiceDto } from "./service.dto.js";

export const serviceTranslationDtoSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export const serviceDtoSchema = z.object({
  _id: z.string().min(1),
  slug: z.string().trim().min(1),
  category: z.enum(serviceCategories),
  iconKey: z.enum(serviceIconKeys),
  featured: z.boolean(),
  sortOrder: z.number().int().positive(),
  isActive: z.boolean(),
  translations: z.record(z.enum(supportedLocales), serviceTranslationDtoSchema),
}) satisfies z.ZodType<ServiceDto>;

export const createServiceSchema = serviceDtoSchema
  .omit({
    _id: true,
    sortOrder: true,
  })
  .extend({
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
  });

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
