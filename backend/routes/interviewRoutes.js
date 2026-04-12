import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as interviewController from '../controllers/interviewController.js';

const router = express.Router();

router.get('/', protect, interviewController.getInterviewQuestions);
router.post('/submit', protect, interviewController.submitAnswer);

export default router;