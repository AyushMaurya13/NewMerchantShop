import express from 'express';
import {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
  getFeaturedProducts,
  createProductReview
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/:id/reviews', protect, createProductReview);

export default router;
