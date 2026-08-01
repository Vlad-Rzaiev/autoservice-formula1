import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getServicesController,
  getServiceBySlugController,
} from './service.controller.js';

const router = Router();

router.get('/api/v1/services', ctrlWrapper(getServicesController));
router.get(
  '/api/v1/services/:serviceSlug',
  ctrlWrapper(getServiceBySlugController),
);

export default router;
