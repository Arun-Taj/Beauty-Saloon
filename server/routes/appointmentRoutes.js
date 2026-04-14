import express from 'express';
import {
  getAvailableSlots,
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  getDashboardStats,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);   // public — no auth needed to check availability

// Client routes
router.post('/',           protect, createAppointment);
router.get('/my',          protect, getMyAppointments);
router.put('/:id/cancel',  protect, cancelAppointment);

// Admin routes
router.get('/admin/stats',        protect, adminOnly, getDashboardStats);
router.get('/admin/all',          protect, adminOnly, getAllAppointments);
router.put('/admin/:id/status',   protect, adminOnly, updateAppointmentStatus);

export default router;