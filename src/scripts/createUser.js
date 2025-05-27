import sequelize from '../config/database.js';
import User from '../models/User.js';

User.initModel(sequelize);

await sequelize.sync();

console.log('Usuario creado');
process.exit();