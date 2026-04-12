import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/mcq', protect, admin, adminController.addMcq);
router.put('/mcq/:id', protect, admin, adminController.editMcq);
router.delete('/mcq/:id', protect, admin, adminController.deleteMcq);

router.post('/coding', protect, admin, adminController.addCoding);
router.put('/coding/:id', protect, admin, adminController.editCoding);
router.delete('/coding/:id', protect, admin, adminController.deleteCoding);

router.post('/interview', protect, admin, adminController.addInterview);
router.put('/interview/:id', protect, admin, adminController.editInterview);
router.delete('/interview/:id', protect, admin, adminController.deleteInterview);

export default router;