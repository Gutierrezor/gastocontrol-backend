import { Model, DataTypes } from 'sequelize';
import Transaction from './Transaction.js';

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false }
      },
      {
        sequelize,
        modelName: 'user',
        tableName: 'users',
        timestamps: true
      }
    );
  }

  static associate() {
    User.hasMany(Transaction, {
      foreignKey: 'userId',
      as: 'transactions'
    });
  }
}

export default User;