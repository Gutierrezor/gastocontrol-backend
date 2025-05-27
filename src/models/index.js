import User from './User.js';
import Category from './Category.js';
import Income from './Income.js';
import Expense from './Expense.js';

function initModels(sequelize) {
  // Inicializa los modelos
  User.initModel(sequelize);
  Category.initModel(sequelize);
  Income.initModel(sequelize);
  Expense.initModel(sequelize);

  // Relaciones
  Category.hasMany(Expense, { foreignKey: 'categoryId' });
  Expense.belongsTo(Category, { foreignKey: 'categoryId' });

  // Puedes agregar más relaciones aquí si las necesitas
}

export default initModels;
