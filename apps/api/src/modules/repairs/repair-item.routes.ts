import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  createRepairItemController,
  deleteRepairItemController,
  getRepairItemsController,
  updateRepairItemController,
} from './repair-item.controller.js';

const router = Router();

router.get(
  '/:id/items',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getRepairItemsController),
);

router.post(
  '/:id/items',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(createRepairItemController),
);

router.patch(
  '/:id/items/:itemId',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(updateRepairItemController),
);

router.delete(
  '/:id/items/:itemId',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(deleteRepairItemController),
);

export default router;
