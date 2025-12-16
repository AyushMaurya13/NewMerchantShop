import express from 'express';
import {
  processStripePayment,
  verifyStripePayment,
  getStripeConfig,
  processPayPalPayment
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/stripe', protect, processStripePayment);
router.post('/stripe/verify', protect, verifyStripePayment);
router.get('/stripe/config', getStripeConfig);
router.post('/paypal', protect, processPayPalPayment);

export default router;
