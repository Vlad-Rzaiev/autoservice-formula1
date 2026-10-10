import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { getDashboardSummaryController } from './dashboard-summary.controller.js';

const router = Router();

router.get(
  '/summary',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getDashboardSummaryController),
);

export default router;
