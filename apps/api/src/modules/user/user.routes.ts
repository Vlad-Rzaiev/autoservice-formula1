import { Router } from 'express';
import {
  loginRequestSchema,
  registerRequestSchema,
} from '@autoservice/contracts';
import { validateBody } from '../../middleware/validate-body.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
} from './user.controller.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerRequestSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginRequestSchema),
  ctrlWrapper(loginUserController),
);

router.get('/me', authenticate, (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    data: {
      user: req.user,
    },
  });
});

export default router;
