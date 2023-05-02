const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ExternalProvider', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ext_provider_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    end_point_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'ExternalProvider',
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
