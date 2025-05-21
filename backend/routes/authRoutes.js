import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js'; 

const router = express.Router();

// Define routes with controller methods
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getProfile);
router.post('/logout', authMiddleware, authController.logout);

export default router;