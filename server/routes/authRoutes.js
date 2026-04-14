import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  getStylists,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',    login);
router.get('/stylists',  getStylists);          // public — booking wizard needs this

router.get('/me',              protect, getMe);
router.put('/profile',         protect, updateProfile);
router.put('/change-password', protect, changePassword);

router.get('/users', protect, adminOnly, getAllUsers);

export default router;