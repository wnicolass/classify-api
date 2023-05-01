import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Feature', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    authenticity: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    condition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AdCondition',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'Feature',
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
        name: 'condition_id',
        using: 'BTREE',
        fields: [
          { name: 'condition_id' },
        ],
      },
      {
        name: 'ix_Feature_brand',
        using: 'BTREE',
        fields: [
          { name: 'brand' },
        ],
      },
    ],
  });
};
