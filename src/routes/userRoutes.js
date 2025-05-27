import express from 'express';
// import auth from '../middleware/auth.js';
import { updateProfile, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.put('/profile', updateProfile);
router.put('/password', changePassword);

export default router;