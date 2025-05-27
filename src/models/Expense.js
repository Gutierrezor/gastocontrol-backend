import { Model, DataTypes } from 'sequelize';

class Expense extends Model {
  static initModel(sequelize) {
    Expense.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        amount: { 
          type: DataTypes.FLOAT, 
          allowNull: false,
          validate: { min: 0 }
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: { len: [0, 255] }
        },
        spentAt: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: 'date',
          validate: { isDate: true }
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'expense',
        tableName: 'expenses',
        timestamps: false,
      }
    );
  }
}

export default Expense;
