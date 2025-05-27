import express from 'express';
import { createIncome, listIncomes } from '../controllers/incomeController.js';

const router = express.Router();

router.post('/', createIncome);
router.get('/', listIncomes);

export default router;