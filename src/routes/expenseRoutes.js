import express from 'express';
import { 
  createExpense, 
  listExpenses, 
  exportExpensesCSV 
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/', listExpenses);
router.get('/export/csv', exportExpensesCSV);

export default router;