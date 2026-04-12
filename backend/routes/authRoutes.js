import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/verify/:token', authController.verify);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);
router.post('/reset/:token', authController.resetPassword);

export default router;