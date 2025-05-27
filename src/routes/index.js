import { Router } from 'express';
import * as income from '../controllers/incomeController.js';
import * as category from '../controllers/categoryController.js';
import * as expense from '../controllers/expenseController.js';
import { monthlySummary, getSummary } from '../controllers/summaryController.js';

import { incomeRules } from '../validators/incomeValidator.js';
import { categoryRules } from '../validators/categoryValidator.js';
import { expenseRules } from '../validators/expenseValidator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// ──────────── Incomes ────────────
router.post('/incomes', incomeRules, validate, income.createIncome);
router.get('/incomes', income.listIncomes);

// ─────────── Categories ──────────
router.post('/categories', categoryRules, validate, category.createCategory);
router.get('/categories', category.listCategories);
router.put('/categories/:id', categoryRules, validate, category.updateCategory);
router.delete('/categories/:id', category.deleteCategory);

// ──────────── Expenses ───────────
router.post('/expenses', expenseRules, validate, expense.createExpense);
router.get('/expenses', expense.listExpenses);

// ───────────── Summary ───────────
router.get('/summary', getSummary);
router.get('/summary/monthly', monthlySummary);

export default router;
