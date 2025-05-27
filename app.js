import express from 'express';
import sequelize from './src/config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';

import initModels from './src/models/index.js'; 

// Rutas
import routes from './src/routes/index.js';
import authRoutes from './src/routes/auth.js';
import historyRoutes from './src/routes/history.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import summaryRoutes from './src/routes/summaryRoutes.js';
import limitRoutes from './src/routes/limitRoutes.js';
import incomeRoutes from './src/routes/incomeRoutes.js';
import expenseRoutes from './src/routes/expenseRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); // Permite cualquier origen para desarrollo

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', routes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/limits', limitRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);

initModels(sequelize); 

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API lista en :${PORT}`));
}).catch((err) => {
  console.error('Error al sincronizar modelos:', err);
});

export default app;
