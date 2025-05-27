import express from 'express';
import { listHistory } from '../controllers/historyController.js';
// import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', listHistory);

export default router;