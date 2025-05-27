// ...existing code...
import Limit from '../models/Limit.js';
import Expense from '../models/Expense.js';
import { Op } from 'sequelize';

export const limitAlert = async (req, res, next) => {
  // Obtén el userId desde el body, query o params
  const userId = req.body.userId || req.query.userId || req.params.userId;
  if (!userId) return res.status(400).json({ error: 'userId requerido' });

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const limit = await Limit.findOne({ where: { userId, month, year } });
  if (!limit) return next();

  const expenses = await Expense.sum('amount', {
    where: {
      userId,
      date: {
        [Op.between]: [
          `${year}-${month.toString().padStart(2, '0')}-01`,
          `${year}-${month.toString().padStart(2, '0')}-31`
        ]
      }
    }
  });

  const newAmount = Number(req.body.amount) || 0;
  if ((expenses || 0) + newAmount > limit.amount) {
    return res.status(400).json({ warning: 'Has superado tu límite mensual de gasto.' });
  }
  next();
};
// ...existing code...