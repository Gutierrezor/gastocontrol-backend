import express from 'express';
import sequelize from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';

import initModels from './models/index.js'; 

// Rutas
import routes from './routes/index.js';
import authRoutes from './routes/auth.js';
import historyRoutes from './routes/history.js';
import categoryRoutes from './routes/categoryRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import limitRoutes from './routes/limitRoutes.js';
import expensesExportRouter from './routes/expensesExport.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', routes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/limits', limitRoutes);
app.use('/api/expenses', expensesExportRouter);

initModels(sequelize); 

// Arranca el servidor y sincroniza modelos
sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => console.log(`API lista en :${PORT}`));
}).catch((err) => {
  console.error('Error al sincronizar modelos:', err);
});

export default app;