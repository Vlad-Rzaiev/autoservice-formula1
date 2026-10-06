import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  acceptRepairController,
  approveRepairController,
  cancelRepairController,
  completeRepairController,
  createRepairController,
  getRepairController,
  getRepairsController,
  requestApprovalRepairController,
  resumeRepairController,
  startRepairController,
  updateRepairController,
  waitingPartsRepairController,
} from './repair.controller.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getRepairsController),
);

router.get(
  '/:id',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getRepairController),
);

router.post(
  '/',
  authenticate,
  authorize('owner', 'manager', 'client'),
  ctrlWrapper(createRepairController),
);

router.patch(
  '/:id',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(updateRepairController),
);

router.post(
  '/:id/accept',
  authenticate,
  authorize('owner', 'manager'),
  ctrlWrapper(acceptRepairController),
);

router.post(
  '/:id/start',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(startRepairController),
);

router.post(
  '/:id/waiting-parts',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(waitingPartsRepairController),
);

router.post(
  '/:id/resume',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(resumeRepairController),
);

router.post(
  '/:id/request-approval',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(requestApprovalRepairController),
);

router.post(
  '/:id/approve',
  authenticate,
  authorize('owner', 'manager', 'client'),
  ctrlWrapper(approveRepairController),
);

router.post(
  '/:id/cancel',
  authenticate,
  authorize('owner', 'manager'),
  ctrlWrapper(cancelRepairController),
);

router.post(
  '/:id/complete',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(completeRepairController),
);

export default router;
