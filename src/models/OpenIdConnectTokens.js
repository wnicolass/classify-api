import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('OpenIdConnectTokens', {
    state: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
    },
    nonce: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'OpenIdConnectTokens',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'state' },
        ],
      },
    ],
  });
};
