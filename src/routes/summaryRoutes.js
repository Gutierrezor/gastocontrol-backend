import express from 'express';
import { monthlySummary } from '../controllers/summaryController.js';

const router = express.Router();

router.get('/monthly', monthlySummary);

export default router;