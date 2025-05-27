import { DataTypes, Model } from 'sequelize';

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: true }, // null = categoría global
      },
      {
        sequelize,
        modelName: 'category',
        tableName: 'categories',
        timestamps: true,
      }
    );
  }
}

export default Category;
