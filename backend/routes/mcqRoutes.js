import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as mcqController from '../controllers/mcqController.js';

const router = express.Router();

router.get('/', protect, mcqController.getMcqs);
router.post('/submit', protect, mcqController.submitMcq);

export default router;