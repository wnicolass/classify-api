import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdStatus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status_name_internal: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status_description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'AdStatus',
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
