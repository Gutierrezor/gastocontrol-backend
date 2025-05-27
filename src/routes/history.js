import express from 'express';
// import { authenticateToken } from '../middleware/auth.js';
import { getHistory } from '../controllers/historyController.js';

const router = express.Router();
router.get('/', getHistory);

export default router;