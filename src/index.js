import express from 'express';
import expensesExportRouter from '../routes/expensesExport.js';

const app = express();

app.use('/api/expenses', expensesExportRouter);

export default app;