import express from 'express';
import ExcelJS from 'exceljs';
import Expense from '../models/Expense.js'; // Adjust path as needed

const router = express.Router();

router.get('/export/excel', async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Date', key: 'date', width: 20 },
      // Add more columns as needed
    ];

    expenses.forEach(expense => {
      worksheet.addRow({
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        // Add more fields as needed
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=expenses.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Error exporting expenses' });
  }
});

export default router;
