import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', ...(authController.register as any));
router.post('/login', ...(authController.login as any));
router.post('/refresh', authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.get('/profile', authenticate, authController.profile);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/forgot-password', ...(authController.forgotPassword as any));
router.post('/reset-password', ...(authController.resetPassword as any));
router.get('/verify-email', authController.verifyEmail);

export default router;
