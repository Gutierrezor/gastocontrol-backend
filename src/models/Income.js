import { Model, DataTypes } from 'sequelize';

export class Income extends Model {
  static initModel(sequelize) {
    Income.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: { min: 0 },
        },
        description: {
          type: DataTypes.STRING,
        },
        date: { 
          type: DataTypes.DATEONLY, 
          allowNull: false,
          defaultValue: DataTypes.NOW, 
        },
      },
      {
        sequelize,
        modelName: 'income',
        tableName: 'incomes',
        timestamps: false,
      }
    );
  }
}

export default Income;