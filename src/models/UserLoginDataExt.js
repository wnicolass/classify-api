const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserLoginDataExt', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    external_provider_token: {
      type: DataTypes.STRING(1200),
      allowNull: false,
    },
    external_provider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExternalProvider',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
  }, {
    sequelize,
    tableName: 'UserLoginDataExt',
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
        name: 'external_provider_id',
        using: 'BTREE',
        fields: [
          { name: 'external_provider_id' },
        ],
      },
      {
        name: 'user_id',
        using: 'BTREE',
        fields: [
          { name: 'user_id' },
        ],
      },
    ],
  });
};
