// ...existing code...
import express from 'express';
// import jwt from 'jsonwebtoken';
import Expense from '../models/Expense.js';
import Income from '../models/Income.js';

// Elimina authenticateToken y referencias a req.user

export const createExpense = async (req, res) => {
  // Lógica para crear gasto
  res.json({ message: 'Gasto creado (demo)' });
};

export const listExpenses = async (req, res) => {
  // Lógica para listar gastos
  res.json([{ id: 1, amount: 100, description: 'Demo' }]);
};

export const getHistory = async (req, res) => {
  const { month, year } = req.query;
  // Elimina el uso de req.user.id
  // const userId = req.user.id;

  // Opcional: si no se envía mes/año, trae todo el historial
  // let expenseWhere = { userId };
  // let incomeWhere = { userId };
  let expenseWhere = {};
  let incomeWhere = {};

  if (month && year) {
    expenseWhere.date = {
      [Op.between]: [
        `${year}-${month}-01`,
        `${year}-${month}-31`
      ]
    };
    incomeWhere.date = {
      [Op.between]: [
        `${year}-${month}-01`,
        `${year}-${month}-31`
      ]
    };
  }

  try {
    const expenses = await Expense.findAll({ where: expenseWhere });
    const incomes = await Income.findAll({ where: incomeWhere });

    res.json({ expenses, incomes });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

// Exporta solo las funciones necesarias
export default {
  createExpense,
  listExpenses,
  getHistory
};
// ...existing code...