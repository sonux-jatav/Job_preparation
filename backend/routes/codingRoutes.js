import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as codingController from '../controllers/codingController.js';

const router = express.Router();

router.get('/', protect, codingController.getCodingProblems);
router.post('/submit', protect, codingController.submitCode);

export default router;