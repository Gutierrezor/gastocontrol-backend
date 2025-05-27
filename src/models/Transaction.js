import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        name: {
          singular: 'category',
          plural: 'categories'
        },
        timestamps: false
      }
    );
  }
}

export default Category;
