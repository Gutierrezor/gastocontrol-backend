import Transaction from '../models/Transaction.js';
import { Op } from 'sequelize';

export const listHistory = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const transactions = await Transaction.findAll({
      where: {
        userId,
        date: { [Op.between]: [start, end] }
      },
      order: [['date', 'DESC']]
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

// Exporta también como getHistory para compatibilidad con rutas antiguas
export const getHistory = listHistory;