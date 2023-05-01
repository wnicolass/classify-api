import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Subcategory', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    subcategory_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: 'subcategory_name',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'Subcategory',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
      {
        name: 'subcategory_name',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'subcategory_name' },
        ],
      },
      {
        name: 'category_id',
        using: 'BTREE',
        fields: [
          { name: 'category_id' },
        ],
      },
    ],
  });
};
