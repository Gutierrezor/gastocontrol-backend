import express from 'express';
// import auth from '../middleware/auth.js';
import { registerPushToken } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/register', registerPushToken);

export default router;