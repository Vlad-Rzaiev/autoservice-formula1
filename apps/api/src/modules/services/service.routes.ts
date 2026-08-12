import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getServicesController,
  getServiceBySlugController,
  createServiceController,
} from './service.controller.js';
import { validateParams } from '../../middleware/validate-params.js';
import { validateBody } from '../../middleware/validate-body.js';
import { createServiceSchema } from '@autoservice/contracts';
import { getServiceBySlugParamsSchema } from '../../validation/services/service-params.schema.js';

const router = Router();

router.get('/', ctrlWrapper(getServicesController));
router.get(
  '/:serviceSlug',
  validateParams(getServiceBySlugParamsSchema),
  ctrlWrapper(getServiceBySlugController),
);
router.post(
  '/',
  validateBody(createServiceSchema),
  ctrlWrapper(createServiceController),
);

export default router;
