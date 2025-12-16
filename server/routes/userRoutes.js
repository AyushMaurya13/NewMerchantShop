import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { 
  registerValidation, 
  loginValidation, 
  validate 
} from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
