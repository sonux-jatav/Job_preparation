import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as progressController from '../controllers/progressController.js';

const router = express.Router();

router.get('/', protect, progressController.getProgress);

export default router;