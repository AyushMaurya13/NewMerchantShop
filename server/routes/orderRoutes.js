import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderToPaid
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getUserOrders);
  
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
