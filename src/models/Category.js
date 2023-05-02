const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    category_icon: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'Category',
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
        name: 'ix_Category_category_name',
        using: 'BTREE',
        fields: [
          { name: 'category_name' },
        ],
      },
    ],
  });
};
