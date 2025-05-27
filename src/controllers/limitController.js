import Limit from '../models/Limit.js';

export const setLimit = async (req, res) => {
  const userId = req.user.id;
  const { amount, month, year } = req.body;
  try {
    const [limit, created] = await Limit.upsert({
      userId,
      amount,
      month,
      year
    }, { returning: true });
    res.json({ success: true, limit });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el límite' });
  }
};

export const getLimit = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;
  try {
    const limit = await Limit.findOne({ where: { userId, month, year } });
    res.json({ limit });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el límite' });
  }
};
