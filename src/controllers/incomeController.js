import Income from '../models/Income.js';
import { Op } from 'sequelize';

// Crear ingreso
export const createIncome = async (req, res) => {
  const { amount, description, date } = req.body;
  if (!amount) return res.status(400).json({ error: 'Monto requerido' });
  try {
    const income = await Income.create({ amount, description, date });
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar ingreso' });
  }
};

// Listar ingresos (sin requerir req.user)
export const listIncomes = async (req, res) => {
  const { month, year, categoryId, minAmount, maxAmount } = req.query;

  let where = {};

  if (month && year) {
    where.date = {
      [Op.between]: [
        `${year}-${month.toString().padStart(2, '0')}-01`,
        `${year}-${month.toString().padStart(2, '0')}-31`
      ]
    };
  } else if (year) {
    where.date = {
      [Op.between]: [
        `${year}-01-01`,
        `${year}-12-31`
      ]
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (minAmount || maxAmount) {
    where.amount = {};
    if (minAmount) where.amount[Op.gte] = Number(minAmount);
    if (maxAmount) where.amount[Op.lte] = Number(maxAmount);
  }

  try {
    const incomes = await Income.findAll({ where });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar ingresos' });
  }
};

// Obtener ingreso por id
export const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const income = await Income.findOne({ where: { id, userId } });
    if (!income) return res.status(404).json({ error: 'Ingreso no encontrado' });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ingreso' });
  }
};

// Editar ingreso
export const updateIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { amount, description, date, categoryId } = req.body;
    const [updated] = await Income.update(
      { amount, description, date, categoryId },
      { where: { id, userId } }
    );
    if (!updated) return res.status(404).json({ error: 'Ingreso no encontrado' });
    const income = await Income.findOne({ where: { id, userId } });
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar ingreso' });
  }
};

// Eliminar ingreso
export const deleteIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await Income.destroy({ where: { id, userId } });
    if (!deleted) return res.status(404).json({ error: 'Ingreso no encontrado' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ingreso' });
  }
};
