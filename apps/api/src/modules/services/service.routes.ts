import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { getServicesController } from './service.controller.js';

const router = Router();

router.get('/api/v1/services', ctrlWrapper(getServicesController));

export default router;
