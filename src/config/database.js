import { Sequelize } from 'sequelize';

// Usa la base de datos definida en .env o por defecto 'gastocontro'
const dbName = process.env.DB_NAME || 'gastocontro';
const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS || '123456789';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false, 
});

export default sequelize;
