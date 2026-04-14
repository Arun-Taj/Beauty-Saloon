import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/',    getServices);       // public — landing page service menu
router.get('/:id', getServiceById);    // public

router.post('/',    protect, adminOnly, createService);
router.put('/:id',  protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;