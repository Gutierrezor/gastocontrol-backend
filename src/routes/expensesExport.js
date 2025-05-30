import express from 'express';
import ExcelJS from 'exceljs';
import Expense from '../models/Expense.js'; // Ajusta la ruta según tu estructura

const router = express.Router();

router.get('/export/excel', async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Descripción', key: 'description', width: 30 },
      { header: 'Monto', key: 'amount', width: 15 },
      { header: 'Fecha', key: 'spentAt', width: 20 }, // Cambiado a spentAt
      // Agrega más columnas si es necesario
    ];

    expenses.forEach(expense => {
      worksheet.addRow({
        id: expense.id,
        description: expense.description,
        amount: expense.amount,
        spentAt: expense.spentAt, // Cambiado a spentAt
        // Agrega más campos si es necesario
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
    res.status(500).json({ error: 'Error exportando gastos' });
  }
});

export default router;
