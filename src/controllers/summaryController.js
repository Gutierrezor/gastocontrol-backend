import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';
import Expense from '../models/Expense.js';
import Income from '../models/Income.js';
import { Op } from 'sequelize';

export const monthlySummary = async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) return res.status(400).json({ error: 'Mes y año requeridos' });

  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

  try {
    const totalExpenses = await Expense.sum('amount', {
      where: { spentAt: { [Op.between]: [startDate, endDate] } },
    });
    const totalIncomes = await Income.sum('amount', {
      where: { date: { [Op.between]: [startDate, endDate] } },
    });
    res.json({
      month,
      year,
      totalIncomes: totalIncomes || 0,
      totalExpenses: totalExpenses || 0,
      balance: (totalIncomes || 0) - (totalExpenses || 0),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el resumen mensual' });
  }
};
// Exporta también como getSummary para compatibilidad con rutas antiguas
export const getSummary = monthlySummary;
