import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Limit = sequelize.define('Limit', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  name: {
    singular: 'limit',
    plural: 'limits'
  }
});

export default Limit;
