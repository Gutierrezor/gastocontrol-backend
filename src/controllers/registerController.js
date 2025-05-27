import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 6)
    return res.status(400).json({ error: 'Usuario y contraseña (mínimo 6 caracteres) requeridos' });

  try {
    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(409).json({ error: 'El usuario ya existe' });

    const user = await User.create({ username, password });

    // Devuelve el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'un_secreto_super_seguro',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado',
      user: { id: user.id, username: user.username },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};