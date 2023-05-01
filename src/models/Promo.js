import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Promo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    promo_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    promo_internal_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    promo_description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    promo_price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Promo',
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
    ],
  });
};
