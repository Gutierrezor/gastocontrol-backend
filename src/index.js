import express from 'express';
import cors from 'cors';
import expensesExportRouter from '../routes/expensesExport.js';

const app = express();

// Habilita CORS para tu frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/expenses', expensesExportRouter);

export default app;