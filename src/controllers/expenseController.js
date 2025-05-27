import Expense from '../models/Expense.js';
import Category from '../models/Category.js';
import { Op } from 'sequelize';
import { Parser as Json2csvParser } from 'json2csv';

// Asegúrate de tener el modelo Expense creado

export const createExpense = async (req, res) => {
  const { amount, description, spentAt, categoryId } = req.body;
  if (!amount || !spentAt || !categoryId)
    return res.status(400).json({ error: 'Monto, fecha y categoría son requeridos' });

  // Validar que la categoría exista
  const category = await Category.findByPk(categoryId);
  if (!category) {
    return res.status(400).json({ error: 'La categoría especificada no existe' });
  }

  try {
    const expense = await Expense.create({ amount, description, spentAt, categoryId });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar gasto' });
  }
};

export const listExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ include: Category });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar gastos' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id, userId } });
    if (!deleted) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.json({ message: 'Gasto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el gasto' });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const [updated] = await Expense.update(req.body, { where: { id, userId } });
    if (!updated) return res.status(404).json({ error: 'Gasto no encontrado o sin cambios' });
    const expense = await Expense.findOne({ where: { id, userId } });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el gasto' });
  }
};

export const exportExpensesCSV = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ include: Category });
    const fields = ['id', 'amount', 'description', 'spentAt', 'categoryId'];
    const json2csv = new Json2csvParser({ fields });
    const csv = json2csv.parse(expenses.map(e => e.toJSON()));
    res.header('Content-Type', 'text/csv');
    res.attachment('gastos.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Error al exportar gastos' });
  }
};
